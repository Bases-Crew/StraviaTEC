import 'dart:async';
import 'dart:math' show asin, cos, pi, pow, sin, sqrt;
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      title: "StraviaTEC mobile",
      home: MapPage(),
    );
  }
}

class MapPage extends StatefulWidget {
  @override
  _MapPageState createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  final Set<Marker> _markers = Set();
  late GoogleMapController _controller;
  LocationData? currentLocation;
  Location location = Location();
  double totalDistance = 0; // Variable para la distancia total
  double currentSpeed = 0; // Variable para la velocidad actual
  int seconds = 0;
  int minutes = 0;
  int hours = 0;
  late Timer timer;
  List<LatLng> routeCoordinates = [];
  bool isTimerActive = false;

  @override
  void initState() {
    super.initState();
    getCurrentLocation();
  }

  double calculateDistance(
      double startLatitude, double startLongitude, double endLatitude, double endLongitude) {
    const double radiusOfEarth = 6371; // Radio de la Tierra en kilómetros

    // Convertir grados a radianes
    double startLatRadians = startLatitude * (pi / 180);
    double startLongRadians = startLongitude * (pi / 180);
    double endLatRadians = endLatitude * (pi / 180);
    double endLongRadians = endLongitude * (pi / 180);

    // Calcular la diferencia entre las longitudes y latitudes
    double latDiff = endLatRadians - startLatRadians;
    double longDiff = endLongRadians - startLongRadians;

    // Aplicar la fórmula de Haversine
    double a = pow(sin(latDiff / 2), 2) +
        cos(startLatRadians) * cos(endLatRadians) * pow(sin(longDiff / 2), 2);
    double c = 2 * asin(sqrt(a));

    // Calcular la distancia
    double distance = radiusOfEarth * c;
    return distance;
  }

  void getCurrentLocation() async {
  try {
    location.onLocationChanged.listen((LocationData newLocation) {
      setState(() {
        if (isTimerActive) {
          // Solo agregar a la ruta cuando el temporizador está activo
          if (currentLocation != null) {
            // Calcular la distancia entre las ubicaciones actuales
            double distance = calculateDistance(
              currentLocation!.latitude!,
              currentLocation!.longitude!,
              newLocation.latitude!,
              newLocation.longitude!,
            );

            totalDistance += distance;
          }

          // Añadir la nueva ubicación a la ruta
          routeCoordinates.add(LatLng(newLocation.latitude!, newLocation.longitude!));
        }

        currentLocation = newLocation;

        // Calcular la velocidad
        currentSpeed = newLocation.speed != null
            ? newLocation.speed! * 3.6 // Convertir de m/s a km/h
            : 0;
      });

      _addMarker(LatLng(newLocation.latitude!, newLocation.longitude!));
    });
  } catch (e) {
    print('Error al obtener la ubicación: $e');
  }
}

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text("Actividad")),
      ),
      body: Column(
        children: [
          Expanded(
            child: GoogleMap(
              initialCameraPosition: currentLocation != null
                  ? CameraPosition(
                      target: LatLng(
                        currentLocation!.latitude!,
                        currentLocation!.longitude!,
                      ),
                      zoom: 15.0,
                    )
                  : const CameraPosition(
                      target: LatLng(37.7749, -122.4194),
                      zoom: 15.0,
                    ),
              markers: _markers,
              polylines: isTimerActive
                  ? {
                      Polyline(
                        polylineId: const PolylineId("route"),
                        color: Colors.blue,
                        points: routeCoordinates,
                      ),
                    }
                  : Set<Polyline>(),
              onMapCreated: (GoogleMapController controller) {
                setState(() {
                  _controller = controller;
                });
              },
            ),
          ),
          Container(
            color: Colors.grey[200],
            child: Column(
              children: [
                Text(
                  '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}',
                  style: const TextStyle(fontSize: 30),
                ),
                const Divider(thickness: 2),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const Text("Distancia total"),
                        Text("${totalDistance.toStringAsFixed(2)} Km"),
                      ],
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const Text("Velocidad actual"),
                        Text("${currentSpeed.toStringAsFixed(2)} Km/h"),
                      ],
                    ),
                  ],
                ),
                const Divider(thickness: 2),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all<Color>(Colors.deepOrange),
                      ),
                      onPressed: () {
                        startTimer();
                        isTimerActive = true;
                      },
                      child: const Text("Iniciar"),
                    ),
                    ElevatedButton(
                      style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all<Color>(Colors.deepOrange),
                      ),
                      onPressed: () {
                        stopTimer();
                        isTimerActive = false;
                      },
                      child: const Text("Detener"),
                    ),
                    SizedBox(
                      width: 40.0,
                      height: 40.0,
                      child: Container(
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.deepOrange,
                        ),
                        child: IconButton(
                          onPressed: () {
                            if (currentLocation != null) {
                              _controller.animateCamera(
                                CameraUpdate.newLatLng(
                                  LatLng(
                                    currentLocation!.latitude!,
                                    currentLocation!.longitude!,
                                  ),
                                ),
                              );
                            }
                          },
                          icon: const Icon(Icons.my_location),
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  void _addMarker(LatLng position) {
    final Marker marker = Marker(
      markerId: MarkerId(position.toString()),
      position: position,
      infoWindow: const InfoWindow(
        title: 'Ubicación Actual',
      ),
    );

    setState(() {
      _markers.clear();
      _markers.add(marker);
    });
  }

  void startTimer() {
    timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
            minutes = 0;
            hours++;
          }
        }
      });
    });
  }

  void stopTimer() {
    timer.cancel();
  }
}
