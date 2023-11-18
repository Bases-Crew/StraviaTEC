import 'dart:io';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:xml/xml.dart' as xml;

/// The function `saveGPXFile` creates an XML structure for a GPX file and saves it to the external
/// storage directory as "ruta.gpx".
/// 
/// Args:
///   routeCoordinates (List<LatLng>): The `routeCoordinates` parameter is a list of `LatLng` objects.
/// Each `LatLng` object represents a latitude and longitude coordinate on a route.
void saveGPXFile(List<LatLng> routeCoordinates) async {
  final gpx = xml.XmlBuilder();

  /// The code block is creating an XML structure for a GPX file. GPX (GPS Exchange Format) is a
  /// standard file format used to store GPS data.
  gpx.element('gpx', nest: () {
    gpx.attribute('version', '1.1');
    gpx.attribute('xmlns', 'http://www.topografix.com/GPX/1/1');
    gpx.attribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    gpx.attribute('xsi:schemaLocation', 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd');

    gpx.element('trk', nest: () {
      gpx.element('name', nest: 'Route Name');

      gpx.element('trkseg', nest: () {
        for (final coordinate in routeCoordinates) {
          gpx.element('trkpt', nest: () {
            gpx.attribute('lat', coordinate.latitude.toString());
            gpx.attribute('lon', coordinate.longitude.toString());
          });
        }
      });
    });
  });

  final gpxString = gpx.build().toXmlString(pretty: true);

  // Obtener el directorio externo
  final directory = await getExternalStorageDirectory();

  // Crear el archivo en el directorio externo
  final file = File('${directory!.path}/ruta.gpx');
  file.writeAsStringSync(gpxString);

  print('Archivo GPX guardado en: ${file.path}');
}
