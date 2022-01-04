import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from './three.js-master/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
<<<<<<< HEAD
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
=======
>>>>>>> 08e694f655dd29c63a8aa19bce33afe787fa96e6

//renderer
const rend = new THREE.WebGLRenderer({antialias:true});
rend.shadowMap.enabled = true;
rend.shadowMap.type = THREE.PCFSoftShadowMap;
rend.setSize(window.innerWidth, window.innerHeight);
rend.setClearColor("#888888"); // just additional to determine obj in scene

document.body.appendChild(rend.domElement);

//setup camera
const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
cam.position.set(16,12,-8);
cam.lookAt(0,0,0);

//setup scene
const scene = new THREE.Scene();

//setup spotlite
const spotlite = new THREE.SpotLight("#E8DC8B", 1, 1000, Math.PI/8);
spotlite.position.set(20, 30, 0);
spotlite.castShadow = true;
spotlite.intensity = 1;
scene.add(spotlite);

//setup ambience
const ambiLite = new THREE.AmbientLight("#E8DC8B", 0.3);
scene.add(ambiLite);

function addkeyListener(){
    document.addEventListener("keypress", keyListener);
}

//setup items
//table
//tableTop
const tableTop = new THREE.Mesh(
                        new THREE.CylinderGeometry(12, 12, 1.2, 8),
                        new THREE.MeshPhongMaterial({
                            normalMap: new THREE.TextureLoader().load('./assets/textures/wood_normal.png'),
                            map: new THREE.TextureLoader().load('./assets/textures/wood_texture.jpg')
                        })       
                    );
tableTop.position.set(-20,-10,10);
tableTop.rotation.set(0,0,0);
tableTop.receiveShadow = true;
tableTop.castShadow = true;
scene.add(tableTop);

console.log('hehe');

// tableLeg
const tableLeg = new THREE.Mesh(
                    new THREE.CylinderGeometry(1, 1, 16, 64),
                    new THREE.MeshPhongMaterial({
                            normalMap: new THREE.TextureLoader().load('./assets/textures/wood_normal.png'),
                            map: new THREE.TextureLoader().load('./assets/textures/wood_texture.jpg')
                    })
                );
tableLeg.position.set(-20,-18.5,10);
tableLeg.receiveShadow = true;
tableLeg.castShadow = true;
scene.add(tableLeg);

//tableBottom
const tableBottom = new THREE.Mesh(
                        new THREE.CylinderGeometry(5, 5, 1, 8),
                        new THREE.MeshPhongMaterial({
                            normalMap: new THREE.TextureLoader().load('./assets/textures/wood_normal.png'),
                            map: new THREE.TextureLoader().load('./assets/textures/wood_texture.jpg')
                    })
                );
tableBottom.position.set(-20,-27,10);
tableBottom.receiveShadow = true;
tableBottom.castShadow = true;
scene.add(tableBottom);


//cake here
//cake_plate
const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(7,7,0.5,64),
    new THREE.MeshPhongMaterial({  
        reflectivity: 1             
      })
);
plate.position.set(-20,-9,10);
plate.castShadow = true;
plate.receiveShadow = true;
plate.shininess = 64;
// plate.reflectivity = 1;

scene.add(plate);

//cake_bottom
const cakeBottom = new THREE.Mesh(
    new THREE.CylinderGeometry(5,5,4,64),
    new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./assets/textures/frosting_texture.jpg'),
        normalMap: new THREE.TextureLoader().load('./assets/textures/frosting_normal.png'),            
      })
);
cakeBottom.position.set(-20,-7,10);
cakeBottom.castShadow = true;
cakeBottom.receiveShadow = true;

scene.add(cakeBottom);

//cake_top
const cakeTop = new THREE.Mesh(
    new THREE.CylinderGeometry(3,3,4,64),
    new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./assets/textures/frosting_texture.jpg'),
        normalMap: new THREE.TextureLoader().load('./assets/textures/frosting_normal.png'),            
      })
);

cakeTop.position.set(-20,-3,10);
cakeTop.castShadow = true;
cakeTop.receiveShadow = true;

scene.add(cakeTop);

//decor codes

//cream & choco
const chocoBottom = [];
const chocoTop = [];
var generateChoco = () => {
    let chocoGeo = new THREE.SphereGeometry(0.3,32,32)
    let chocoMat = new THREE.MeshPhongMaterial({color: 0x5e350C})
    let chocoMesh = new THREE.Mesh(chocoGeo,chocoMat)
    chocoMesh.position.set(-20,-5,10);
    chocoMesh.castShadow = true;
    chocoMesh.receiveShadow = true;
    scene.add(chocoMesh)
    return chocoMesh
}

const creamBottom = [];
const creamTop = [];
var generateCream = () => {
    let creamGeo = new THREE.TorusGeometry(0.3,0.3,30,64)
    let creamMat = new THREE.MeshPhongMaterial({})
    let creamMesh = new THREE.Mesh(creamGeo,creamMat)
    creamMesh.rotation.x = Math.PI/2;
    creamMesh.castShadow = true;
    creamMesh.receiveShadow = true;
    scene.add(creamMesh)
    return creamMesh
}

//𝑥 = (𝑐𝑎𝑘𝑒 𝑟𝑎𝑑𝑖𝑢𝑠 – decoration size * 2 – 0.1) * sin (n-decoration * 360 / total decoration)
//y = top of bottom cake  
//𝑧 = (𝑐𝑎𝑘𝑒 𝑟𝑎𝑑𝑖𝑢𝑠 – decoration size * 2 – 0.1) * cos (n-decoration * 360 / total decoration)    
for(let i = 0; i < 10; i++){
    creamBottom[i] = generateCream();
    creamBottom[i].rotation.x = Math.PI/2;
    creamBottom[i].position.set( 
                            ((5 - (0.3 * 2)) - 0.1) * (Math.sin((i * 360) / 10)) - 20,
                            -5,
                            ((5 - (0.3 * 2)) - 0.1) * (Math.cos((i * 360) / 10)) + 10);
    
    chocoBottom[i] = generateChoco();                            
    chocoBottom[i].position.set( 
                                ((5 - (0.3 * 2)) - 0.1) * (Math.sin((i * 360) / 10)) - 20,
                                -4.5,
                                ((5 - (0.3 * 2)) - 0.1) * (Math.cos((i * 360) / 10)) + 10);                            
}

for(let i = 0; i < 10; i++){
    creamTop[i] = generateCream(); 
    creamTop[i].rotation.x = Math.PI/2;
    creamTop[i].position.set( 
                            ((3 - (0.3 * 2)) - 0.1) * (Math.sin((i * 360) / 10)) - 20,
                            -1,
                            ((3 - (0.3 * 2)) - 0.1) * (Math.cos((i * 360) / 10)) + 10);

    chocoTop[i] = generateChoco();                            
    chocoTop[i].position.set( 
                            ((3 - (0.3 * 2)) - 0.1) * (Math.sin((i * 360) / 10)) - 20,
                            -0.5,
                            ((3 - (0.3 * 2)) - 0.1) * (Math.cos((i * 360) / 10)) + 10);                        
}

//text loader following this tutorial :     

var loader = new FontLoader();
loader.load('./three.js-master/examples/fonts/helvetiker_bold.typeface.json',function(font){
    var textGeo = new TextGeometry('Happy Birthday',{
       font: font,
       size: 0.4,
       height: 0.05,
    }); 
    var textMesh = new THREE.Mesh(textGeo, 
                                new THREE.MeshStandardMaterial({color: 0xD65645})
                                  );
    textMesh.castShadow = true;
    textMesh.receiveShadow = true;
    textMesh.position.set(-20,0,12);   
    textMesh.rotation.set(- (Math.PI/8), 90*(Math.PI/180), 0);

    scene.add(textMesh);
});


const orbCtrl = new OrbitControls(cam, rend.domElement);
orbCtrl.enabled = true;
//keylistener
function keyListener(event){
    let keyCode = event.keyCode;
    if(keyCode == 119){ //w
        // setting fpp
        if(cam.position.x == 16 && cam.position.y == 12 && cam.position.z == -8){
            cam.position.set(2, 0, 2);
            cam.lookAt(-30,-4,15);
            
            orbCtrl.enabled = false;
           // cam.lookAt(new THREE.Vector3(0,-10,0));
        }
        else{
            //setting tpp
            // const orbCtrl = new OrbitControls(cam, rend.domElement);
            cam.position.set(16,12,-8);
            cam.lookAt(0,0,0);
            orbCtrl.enabled = true;

        }
    } 

    if(keyCode == 113){//q
        //turn on and off spotlight
        if(spotlite.intensity == 1){
            //spotlite off
            spotlite.intensity = 0;
        }
        //spotlite default on
        else spotlite.intensity = 1;
    }

    if(keyCode == 97) {//s
        //add code to turn on and off candle lits
    } 

    //rotate the cam
    if(keyCode == 100){//d
        cakeTop.rotation.y += Math.PI/200;
        cakeBottom.rotation.y += Math.PI/200;
        plate.rotation.y += Math.PI/200;

    }

    if(keyCode == 97){//a
        cakeTop.rotation.y -= Math.PI/200;
        cakeBottom.rotation.y -= Math.PI/200;
        plate.rotation.y -= Math.PI/200;
        // creamTop[0].rotation.y -= Math.PI/200;
        
    }

    if(keyCode == 32){//space
        //reset rotations
        cakeTop.rotation.set(0,0,0);
        cakeBottom.rotation.set(0,0,0);
        plate.rotation.set(0,0,0);
    }


    console.log(keyCode);
}


//3d model added
    const loadGtlf = new GLTFLoader();
    // loadGtlf.load                                    
    const objcam = await loadGtlf.loadAsync('./assets/3dmodel/model.gltf');

    // objcam.position.set(20, -2, 0);
    // objcam.rotation.set(0, -Math.PI/2, 0);

    objcam.scenes.forEach(cams=>{
        cams.receiveShadow = true;
        scene.add(cams);
    });

//skybox geometry

//to render the whole code :v
function animate(){
    requestAnimationFrame(animate);
    rend.render(scene, cam);
    addkeyListener();
}

requestAnimationFrame(animate);