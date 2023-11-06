import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'dart:async';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
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
  int seconds = 0;
  int minutes = 0;
  late Timer timer;

  @override
  void initState() {
    super.initState();
    getCurrentLocation();
  }

  void getCurrentLocation() async {
    Location location = Location();
    try {
      currentLocation = await location.getLocation();
      if (currentLocation != null) {
        _addMarker(
          LatLng(currentLocation!.latitude!, currentLocation!.longitude!),
          'Ubicación Actual',
        );
      }
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
                  : CameraPosition(
                      target: LatLng(37.7749, -122.4194),
                      zoom: 15.0,
                    ),
              markers: _markers,
              onMapCreated: (GoogleMapController controller) {
                setState(() {
                  _controller = controller;
                });
              },
            ),
          ),
          Container(
            color: Colors.amber,
            child: Column(
              children: [
                Text(
                  '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}',
                  style: TextStyle(fontSize: 30),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        startTimer();
                      },
                      child: Text("Iniciar"),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        stopTimer();
                      },
                      child: Text("Detener"),
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

  void _addMarker(LatLng position, String markerId) {
    final Marker marker = Marker(
      markerId: MarkerId(markerId),
      position: position,
      infoWindow: InfoWindow(
        title: markerId,
      ),
    );

    setState(() {
      _markers.add(marker);
    });
  }

  void startTimer() {
    timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
      });
    });
  }

  void stopTimer() {
    timer.cancel();
  }
}
