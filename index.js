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
//chocolate ball
const choco = new THREE.Mesh(
    new THREE.SphereGeometry(0.3,32,32),
    new THREE.MeshPhongMaterial({                
        color: 0x5e350C
      })
);
choco.position.set(-20,-5,10);
choco.castShadow = true;
choco.receiveShadow = true;

scene.add(choco);

//cream (1-10 for bottom cake, 11-20 for top cake)

///////////////////////////////////////////////////
//cream 1
const cream1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
//𝑥 = (𝑐𝑎𝑘𝑒 𝑟𝑎𝑑𝑖𝑢𝑠 – decoration size * 2 – 0.1) * sin (n-decoration * 360 / total decoration)
//𝑧 = (𝑐𝑎𝑘𝑒 𝑟𝑎𝑑𝑖𝑢𝑠 – decoration size * 2 – 0.1) * cos (n-decoration * 360 / total decoration)    
//x = (5 - 0.3 * 2 - 0.1) * sin (0 * 360 / 10) + (- 20) (ps. minus 20 because of initial position)      
//y = top of bottom cake    
//z = (5 - 0.3 * 2 - 0.1) * sin (0 * 360 / 10) + 10     (ps. add 10 because of initial position)
// cream1.position.set(-24.2,-5,10-0.05);
cream1.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((1 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((1 * 360) / 10)) + 10
    );
cream1.rotation.x = Math.PI/2; //𝜋/ 2 𝑟𝑎𝑑 = 90 degree //idk if it's x or y axis based on the 2nd rotation, but following the reference picture it's using x axis
cream1.castShadow = true;
cream1.receiveShadow = true;

scene.add(cream1);


//cream 2
const cream2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream2.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((2 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((2 * 360) / 10)) + 10
    );
cream2.rotation.x = Math.PI/2;
cream2.castShadow = true;
cream2.receiveShadow = true;

scene.add(cream2);

//cream 3
const cream3 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream3.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((3 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((3 * 360) / 10)) + 10
    );
cream3.rotation.x = Math.PI/2;
cream3.castShadow = true;
cream3.receiveShadow = true;

scene.add(cream3);

//cream 4
const cream4 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream4.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((4 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((4 * 360) / 10)) + 10
    );
cream4.rotation.x = Math.PI/2;
cream4.castShadow = true;
cream4.receiveShadow = true;

scene.add(cream4);

//cream 5
const cream5 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream5.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((5 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((5 * 360) / 10)) + 10
    );
cream5.rotation.x = Math.PI/2;
cream5.castShadow = true;
cream5.receiveShadow = true;

scene.add(cream5);

//cream 6
const cream6 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream6.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((6 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((6 * 360) / 10)) + 10
    );
cream6.rotation.x = Math.PI/2;
cream6.castShadow = true;
cream6.receiveShadow = true;

scene.add(cream6);

//cream 7
const cream7 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream7.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((7 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((7 * 360) / 10)) + 10
    );
cream7.rotation.x = Math.PI/2;
cream7.castShadow = true;
cream7.receiveShadow = true;

scene.add(cream7);

//cream 8
const cream8 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream8.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((8 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((8 * 360) / 10)) + 10
    );
cream8.rotation.x = Math.PI/2;
cream8.castShadow = true;
cream8.receiveShadow = true;

scene.add(cream8);

//cream 9
const cream9 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream9.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((9 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((9 * 360) / 10)) + 10
    );
cream9.rotation.x = Math.PI/2;
cream9.castShadow = true;
cream9.receiveShadow = true;

scene.add(cream9);

//cream 10
const cream10 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.3,30,64),
    new THREE.MeshPhongMaterial({})
);
cream10.position.set(    
    ((5 - (0.3 * 2)) - 0.1) * (Math.sin((10 * 360) / 10)) - 20,        
    -5,
    ((5 - (0.3 * 2)) - 0.1) * (Math.cos((10 * 360) / 10)) + 10
    );
cream10.rotation.x = Math.PI/2;
cream10.castShadow = true;
cream10.receiveShadow = true;

scene.add(cream10);

//text
const fontLoader = new FontLoader();
fontLoader.load('./three.js-master/examples/fonts/helvetiker_bold.typeface.json', function ( font ){
    const text = new THREE.Mesh(
    new THREE.TextGeometry('Happy Birthday',{font: font,size: 40}),
    new THREE.MeshStandardMaterial({color: 0xD65645})
    );
    text.position.set(20,4,10);
    text.castShadow = true;
    text.receiveShadow = true;
    text.rotation.set(-Math.PI / 8, Math.PI / 2, 0); //Euler (− 𝜋/ 8 𝑟𝑎𝑑, 𝜋/ 2 𝑟𝑎𝑑, 0)

    scene.add(text);
});
//to render the whole code :v
function animate(){
    rend.render(scene, cam);
    requestAnimationFrame(animate);
    addkeyListener();
}

requestAnimationFrame(animate);
