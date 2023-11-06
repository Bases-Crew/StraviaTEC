import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:xml/xml.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MapScreen(),
    );
  }
}

class MapScreen extends StatefulWidget {
  @override
  _MapScreenState createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  GoogleMapController mapController;
  Location location = Location();
  List<LatLng> routePoints = [];

  @override
  void initState() {
    super.initState();
    location.onLocationChanged.listen((LocationData locationData) {
      // Add the current location to the routePoints list
      routePoints.add(LatLng(locationData.latitude, locationData.longitude));
      // Update the map with the new location
      mapController.animateCamera(CameraUpdate.newLatLng(LatLng(locationData.latitude, locationData.longitude));
    });
  }

  // Function to save the GPX file
  void saveGPXFile() async {
    final gpx = GpxDocument.create(
      version: '1.1',
      creator: 'Your App Name',
      tracks: [
        Track(
          segments: [
            TrackSegment(
              points: routePoints.map((latLng) {
                return TrackPoint(
                  position: Position(latitude: latLng.latitude, longitude: latLng.longitude),
                );
              }).toList(),
            ),
          ],
        ),
      ],
    );

    final gpxString = gpx.toString(pretty: true);

    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/my_route.gpx');
    await file.writeAsString(gpxString);

    // You can also display a message to the user to indicate that the GPX file has been saved.
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Example'),
      ),
      body: GoogleMap(
        onMapCreated: (controller) {
          mapController = controller;
        },
        initialCameraPosition: CameraPosition(target: LatLng(0.0, 0.0), zoom: 16.0),
        myLocationEnabled: true,
        mapType: MapType.normal,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: saveGPXFile,
        child: Icon(Icons.save),
      ),
    );
  }
}
