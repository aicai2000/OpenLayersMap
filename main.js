import './style.css';
import bigdotUrl from "./images/bigdot.png";
import dotUrl from "./images/dot.svg";
import squareUrl from "./images/square.svg";
import {Feature, Map, View} from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

const calPloy = new Feature({
  geometry: new Point(fromLonLat([-120.666318, 35.310293])),
});
const calabasas = new Feature({
  geometry: new Point(fromLonLat([-118.630135, 34.147702])),
});
const sandiego = new Feature({
  geometry: new Point(fromLonLat([-117.191076, 32.732491])),
});
const santabarbara = new Feature({
  geometry: new Point(fromLonLat([-119.716644, 34.413141])),
});
calPloy.setStyle(
  new Style({
    image: new Icon({
      color: '#BADA55',
      crossOrigin: 'anonymous',
      src: squareUrl,
    }),
  }),
);

calabasas.setStyle(
  new Style({
    image: new Icon({
      color: 'rgba(255, 0, 0, .5)',
      crossOrigin: 'anonymous',
      src: bigdotUrl,
      scale: 0.1,
    }),
  }),
);

sandiego.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      src: dotUrl,
      scale: 1.5,
    }),
  }),
);

santabarbara.setStyle(
  new Style({
    image: new Icon({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      src: dotUrl
    }),
  }),
);

const vectorSource = new VectorSource({
  features: [calPloy, calabasas, santabarbara, sandiego],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const tileLayer = new TileLayer({
  source: new OSM()
});
const rasterLayer = new TileLayer({
  source: new OGCMapTile({
    url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad',
    crossOrigin: '',
  }),
});

const map = new Map({
  target: 'map',
  layers: [ tileLayer, vectorLayer],
  view: new View({
    center:  fromLonLat([-120.666318, 35.310293]),
    zoom: 7
  })
});
