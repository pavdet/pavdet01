var gl;
var debuginfo;
var strts = 0;
//var canvas;// = document.getElementById('webglcanvas');

function printDebugInfo(dtxt){
  if (strts != 0){
    dbi = document.getElementById("debin").innerHTML;
    dbi = dbi + ";<br>" + dtxt;
    document.getElementById("debin").innerHTML = dbi;
  }else {
    document.getElementById("debin").innerHTML = dtxt;
    strts = 1;
  }
}

function initGL(can) {

  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  console.log(names);
  for (var i=0; i< names.length; ++i){
    try {
      gl = can.getContext(names[i]);
      console.log(names[i]);
      printDebugInfo(names[i]);
    }
    catch (e) {
      console.log(names[i] + " is a problem.");
    }
    if (gl) {
      debuginfo = "Now you have the webgl context. ";
      //document.getElementById("debin").innerHTML = debuginfo;
      printDebugInfo(debuginfo);
      console.log(debuginfo);
      break;
    }
  }
  if (gl == null) {
    //alert ("Could not initiate WebGL");
    printDebugInfo("Could not initiate WebGL");
    return null;
  }
  gl.viewportWidth = can.width;
  gl.viewportHeight = can.height;
}

// SHADER COMPILER

function createShaders(gl, src, type)
{

  printDebugInfo(src);
  var shader;
  if (type == 'v')
  {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else if (type == 'f') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    printDebugInfo("No such shader type: " + type);
    return null;
  }
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    printDebugInfo("Problem with " + type + " shader.");
    return null;
  }
}


function initShaders(){
  shaderProgramme = gl.createProgram();
  vsh = gl.createShader(gl.VERTEX_SHADER);
  fsh = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vsh, vertexShaderSource);
  gl.compileShader(vsh);
  printDebugInfo("Vertex compile status:" + gl.COMPILE_STATUS);
//  printDebugInfo();
  gl.shaderSource(fsh, fragmentShaderSource);
  gl.compileShader(fsh);
  printDebugInfo("Fragment compile status:" + gl.COMPILE_STATUS);

  if (!gl.getShaderParameter(vsh,gl.COMPILE_STATUS) ||
      !gl.getShaderParameter(fsh,gl.COMPILE_STATUS))
  {
    printDebugInfo("Problem compiling shaders");
    printDebugInfo(gl.COMPILE_STATUS);
    return null;
  } else {
    gl.attachShader(shaderProgramme, vsh);
    gl.attachShader(shaderProgramme, fsh);
  }

  gl.linkProgram(shaderProgramme);

  if (!gl.getProgramParameter(shaderProgramme), gl.LINK_STATUS)
  {
    printDebugInfo("Could not instantiate shader");
    return null;
  }

  return shaderProgramme;
}


function startgl(){
  var canvas = document.getElementById('wcs');
  if (!canvas){
    alert("Cannot find canvas.");
    return null;
  }
  else {
    console.log("Canvas found");
  }
  initGL(canvas);
  printDebugInfo("shader:");
  printDebugInfo(vertexShaderSource);
//  console.log(gl);
//  shp = initShaders();
}
