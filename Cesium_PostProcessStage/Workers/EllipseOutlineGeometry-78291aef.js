/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./Transforms-94513c2d","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88","./EllipseGeometryLibrary-adc347fa"],function(e,b,m,_,g,v,E,x,M,w,C,D,G){"use strict";var L=new v.Cartesian3,u=new v.Cartesian3;var O=new E.BoundingSphere,V=new E.BoundingSphere;function c(e){var t=(e=_.defaultValue(e,_.defaultValue.EMPTY_OBJECT)).center,i=_.defaultValue(e.ellipsoid,v.Ellipsoid.WGS84),r=e.semiMajorAxis,a=e.semiMinorAxis,n=_.defaultValue(e.granularity,g.CesiumMath.RADIANS_PER_DEGREE);if(!b.defined(t))throw new m.DeveloperError("center is required.");if(!b.defined(r))throw new m.DeveloperError("semiMajorAxis is required.");if(!b.defined(a))throw new m.DeveloperError("semiMinorAxis is required.");if(r<a)throw new m.DeveloperError("semiMajorAxis must be greater than or equal to the semiMinorAxis.");if(n<=0)throw new m.DeveloperError("granularity must be greater than zero.");var o=_.defaultValue(e.height,0),s=_.defaultValue(e.extrudedHeight,o);this._center=v.Cartesian3.clone(t),this._semiMajorAxis=r,this._semiMinorAxis=a,this._ellipsoid=v.Ellipsoid.clone(i),this._rotation=_.defaultValue(e.rotation,0),this._height=Math.max(s,o),this._granularity=n,this._extrudedHeight=Math.min(s,o),this._numberOfVerticalLines=Math.max(_.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}c.packedLength=v.Cartesian3.packedLength+v.Ellipsoid.packedLength+8,c.pack=function(e,t,i){if(!b.defined(e))throw new m.DeveloperError("value is required");if(!b.defined(t))throw new m.DeveloperError("array is required");return i=_.defaultValue(i,0),v.Cartesian3.pack(e._center,t,i),i+=v.Cartesian3.packedLength,v.Ellipsoid.pack(e._ellipsoid,t,i),i+=v.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=_.defaultValue(e._offsetAttribute,-1),t};var h=new v.Cartesian3,y=new v.Ellipsoid,A={center:h,ellipsoid:y,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};c.unpack=function(e,t,i){if(!b.defined(e))throw new m.DeveloperError("array is required");t=_.defaultValue(t,0);var r=v.Cartesian3.unpack(e,t,h);t+=v.Cartesian3.packedLength;var a=v.Ellipsoid.unpack(e,t,y);t+=v.Ellipsoid.packedLength;var n=e[t++],o=e[t++],s=e[t++],l=e[t++],u=e[t++],d=e[t++],f=e[t++],p=e[t];return b.defined(i)?(i._center=v.Cartesian3.clone(r,i._center),i._ellipsoid=v.Ellipsoid.clone(a,i._ellipsoid),i._semiMajorAxis=n,i._semiMinorAxis=o,i._rotation=s,i._height=l,i._granularity=u,i._extrudedHeight=d,i._numberOfVerticalLines=f,i._offsetAttribute=-1===p?void 0:p,i):(A.height=l,A.extrudedHeight=d,A.granularity=u,A.rotation=s,A.semiMajorAxis=n,A.semiMinorAxis=o,A.numberOfVerticalLines=f,A.offsetAttribute=-1===p?void 0:p,new c(A))},c.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var t=e._height,i=e._extrudedHeight,r=!g.CesiumMath.equalsEpsilon(t,i,0,g.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var a,n={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:t,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};if(r)n.extrudedHeight=i,n.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.center,i=e.ellipsoid,r=e.semiMajorAxis,a=v.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,L),e.height,L);O.center=v.Cartesian3.add(t,a,O.center),O.radius=r,a=v.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,a),e.extrudedHeight,a),V.center=v.Cartesian3.add(t,a,V.center),V.radius=r;var n=G.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,o=new w.GeometryAttributes({position:new M.GeometryAttribute({componentDatatype:x.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:G.EllipseGeometryLibrary.raisePositionsToHeight(n,e,!0)})});n=o.position.values;var s=E.BoundingSphere.union(O,V),l=n.length/3;if(b.defined(e.offsetAttribute)){var u=new Uint8Array(l);if(e.offsetAttribute===D.GeometryOffsetAttribute.TOP)u=D.arrayFill(u,1,0,l/2);else{var d=e.offsetAttribute===D.GeometryOffsetAttribute.NONE?0:1;u=D.arrayFill(u,d)}o.applyOffset=new M.GeometryAttribute({componentDatatype:x.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u})}var f=_.defaultValue(e.numberOfVerticalLines,16);f=g.CesiumMath.clamp(f,0,l/2);var p=C.IndexDatatype.createTypedArray(l,2*l+2*f);l/=2;var m,c,h=0;for(m=0;m<l;++m)p[h++]=m,p[h++]=(m+1)%l,p[h++]=m+l,p[h++]=(m+1)%l+l;if(0<f){var y=Math.min(f,l);c=Math.round(l/y);var A=Math.min(c*f,l);for(m=0;m<A;m+=c)p[h++]=m,p[h++]=m+l}return{boundingSphere:s,attributes:o,indices:p}}(n);else if(a=function(e){var t=e.center;u=v.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,u),e.height,u),u=v.Cartesian3.add(t,u,u);for(var i=new E.BoundingSphere(u,e.semiMajorAxis),r=G.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,a=new w.GeometryAttributes({position:new M.GeometryAttribute({componentDatatype:x.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:G.EllipseGeometryLibrary.raisePositionsToHeight(r,e,!1)})}),n=r.length/3,o=C.IndexDatatype.createTypedArray(n,2*n),s=0,l=0;l<n;++l)o[s++]=l,o[s++]=(l+1)%n;return{boundingSphere:i,attributes:a,indices:o}}(n),b.defined(e._offsetAttribute)){var o=a.attributes.position.values.length,s=new Uint8Array(o/3),l=e._offsetAttribute===D.GeometryOffsetAttribute.NONE?0:1;D.arrayFill(s,l),a.attributes.applyOffset=new M.GeometryAttribute({componentDatatype:x.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:s})}return new M.Geometry({attributes:a.attributes,indices:a.indices,primitiveType:M.PrimitiveType.LINES,boundingSphere:a.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=c});