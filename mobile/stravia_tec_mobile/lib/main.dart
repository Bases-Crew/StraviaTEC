import 'dart:async';
import 'dart:math' show asin, cos, pi, pow, sin, sqrt;
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:stravia_tec_mobile/gpxFile.dart';

/// The main function runs the MyApp widget.
void main() {
  runApp(MyApp());
}

/// The `MyApp` class is a StatelessWidget that returns a MaterialApp widget with a custom theme and a
/// MapPage as the home page.
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

/// The MapPage class is a StatefulWidget in Dart.
class MapPage extends StatefulWidget {
  @override
  _MapPageState createState() => _MapPageState();
}

/// The `_MapPageState` class is a stateful widget that displays a Google Map along with various buttons
/// and information related to a timer and GPS coordinates.
class _MapPageState extends State<MapPage> {
  final Set<Marker> _markers = Set();
  late GoogleMapController _controller;
  LocationData? currentLocation;
  Location location = Location();
  double totalDistance = 0;
  double currentSpeed = 0;
  int seconds = 0;
  int minutes = 0;
  int hours = 0;
  late Timer timer;
  List<LatLng> routeCoordinates = [];
  bool isTimerActive = false;
  bool isMapCreated = false;

  @override
  void initState() {
    super.initState();
    getCurrentLocation();
  }

 /// The function calculates the distance between two points on Earth using the Haversine formula.
 /// 
 /// Args:
 ///   startLatitude (double): The start latitude is the latitude of the starting point in degrees.
 ///   startLongitude (double): The startLongitude parameter represents the longitude of the starting
 /// point in degrees.
 ///   endLatitude (double): The endLatitude parameter represents the latitude of the destination point
 /// in degrees.
 ///   endLongitude (double): The endLongitude parameter represents the longitude of the end location.
 /// 
 /// Returns:
 ///   the calculated distance between two points on the Earth's surface in kilometers.
  double calculateDistance(double startLatitude, double startLongitude,
      double endLatitude, double endLongitude) {
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

/// The function `getCurrentLocation` listens for location changes and updates the current location,
/// calculates distance and speed, adds the new location to the route, adds a marker to the map, and
/// centers the camera on the new location.
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
            routeCoordinates
                .add(LatLng(newLocation.latitude!, newLocation.longitude!));
          }

          currentLocation = newLocation;

          // Calcular la velocidad
          currentSpeed = newLocation.speed != null
              ? newLocation.speed! * 3.6 // Convertir de m/s a km/h
              : 0;
        });

        _addMarker(LatLng(newLocation.latitude!, newLocation.longitude!));

        // Centrar la cámara en la nueva ubicación del marcador
        if (isMapCreated) {
          _controller.animateCamera(
            CameraUpdate.newLatLng(
                LatLng(newLocation.latitude!, newLocation.longitude!)),
          );
        }
      });
    } catch (e) {
      print('Error al obtener la ubicación: $e');
    }
  }

/// The dispose function cancels a timer and calls the super.dispose() method.
  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

/// This function builds a Flutter widget that displays a Google Map along with various buttons and
/// information related to a timer and GPS coordinates.
/// 
/// Args:
///   context (BuildContext): The `context` parameter is a reference to the current build context. It is
/// typically used to access the theme, localization, and other contextual information within the widget
/// tree.
/// 
/// Returns:
///   The code is returning a `Scaffold` widget with an `AppBar` and a `Column` as its body. The
/// `Column` contains an `Expanded` widget with a `GoogleMap` widget, and a `Container` widget with a
/// column of text and buttons.
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
                  isMapCreated = true;
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
                      },
                      child: const Text("Detener"),
                    ),
                      ElevatedButton(
                      style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all<Color>(Colors.deepOrange),
                      ),
                      onPressed: () {
                        stopTimer();
                        isTimerActive = false;
                        saveGPXFile(routeCoordinates);
                        resetData();
                        showConfirmationDialog(context);
                      },
                      child: const Text("Terminar"),
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

/// The function `showConfirmationDialog` displays an AlertDialog with a title, content, and an OK
/// button, and pops the dialog when the button is pressed.
/// 
/// Args:
///   context (BuildContext): The `BuildContext` object represents the location in the widget tree where
/// the dialog should be shown. It is typically obtained from the `BuildContext` parameter of the
/// enclosing widget's build method.
/// 
/// Returns:
///   The `showConfirmationDialog` function returns an `AlertDialog` widget.
  void showConfirmationDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Entrenamiento finalizado"),
          content: const Text("Ruta guardada exitosamente."),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("OK"),
            ),
          ],
        );
      },
    );
  }

/// The function `resetData` resets various variables and clears a list in Dart.
  void resetData() {
    setState(() {
      totalDistance = 0;
      currentSpeed = 0;
      seconds = 0;
      minutes = 0;
      hours = 0;
      routeCoordinates.clear();
    });
  }

/// The `_addMarker` function adds a marker to a map at a specified position.
/// 
/// Args:
///   position (LatLng): The position parameter is a LatLng object that represents the latitude and
/// longitude coordinates of the marker's position on the map.
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

/// The function starts a timer that increments the seconds, minutes, and hours variables every second.
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

/// The function "stopTimer" cancels a timer.
  void stopTimer() {
    timer.cancel();
  }
}
