import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'

//renderer
const rend = new THREE.WebGLRenderer({antialias:true});
rend.shadowMap.enabled = true;
rend.shadowMap.type = THREE.PCFSoftShadowMap;
rend.setSize(window.innerWidth, window.innerHeight);
rend.setClearColor("#888888");

document.body.appendChild(rend.domElement);

//setup camera
const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
cam.position.set(16,12,-8);
cam.lookAt(0,0,0);

//setup scene
const scene = new THREE.Scene();

// //LIGHT BIASA
// const lite = new THREE.PointLight(0xffffff, 1, 1500, 0.5);
// lite.position.set(0,800, 0);
// lite.castShadow = true;
// lite.shadow.camera.far = 2000;
// scene.add(lite);

//setup spotlite
const spotlite = new THREE.SpotLight("#E8DC8B", 1, 1000, Math.PI/8);
spotlite.position.set(20, 30, 0);
spotlite.castShadow = true;
scene.add(spotlite);

//setup ambience
const ambiLite = new THREE.AmbientLight("#E8DC8B", 0.3);
scene.add(ambiLite);

//orbit controls
const orbCtrl = new OrbitControls(cam, rend.domElement);


//keylistener
function keyListener(event){
    let keyCode = event.keyCode;
    if(keyCode == 119) cam.position.y += 1; //w
    if(keyCode == 115) cam.position.y -= 1; //a
    if(keyCode == 97) cam.position.x -= 0.1; //s
    if(keyCode == 100) cam.position.x += 0.1; //d


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



//decor codes


//to render the whole code :v
function animate(){
    rend.render(scene, cam);
    requestAnimationFrame(animate);
    addkeyListener();
}

requestAnimationFrame(animate);