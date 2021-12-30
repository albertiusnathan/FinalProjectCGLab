import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'

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

//keylistener
function keyListener(event){
    let keyCode = event.keyCode;
    if(keyCode == 119){ //w
        // setting fpp
        if(cam.position.x == 16 && cam.position.y == 12 && cam.position.z == -8){
            cam.position.set(1, -4, 1);
           // cam.lookAt(new THREE.Vector3(0,-10,0));
        }
        else{
            //orbit controls
            const orbCtrl = new OrbitControls(cam, rend.domElement);
            //setting tpp
            cam.position.set(16,12,-8);
            cam.lookAt(0,0,0);

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
    }

    if(keyCode == 97){//a
    }


    console.log(keyCode);
}

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
//cakePlate
const cakePlate = new THREE.Mesh(
                    new THREE.CylinderGeometry(7, 7, 0.5, 64),
                    new THREE.MeshPhongMaterial({
                        reflectivity: 1,
                        shininess: 64
                    })
);
cakePlate.position.set(-20,-9.25,10);
cakePlate.receiveShadow = true;
cakePlate.castShadow = true;
scene.add(cakePlate);


//decor codes


//to render the whole code :v
function animate(){
    rend.render(scene, cam);
    requestAnimationFrame(animate);
    addkeyListener();
}

requestAnimationFrame(animate);