import "./style.css"
import * as THREE from 'three';

import {Moon} from "lunarphase-js";

// GLOBAL ATTRIBUTES
const layer1 = new THREE.Scene(); // Background
const layer2 = new THREE.Scene(); // Shooting Stars
const layer3 = new THREE.Scene(); // Moon
const camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera2 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera3 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 50 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const stars = [];
const shootingStarsUpdate = []; // keep track of shooting Stars

/**
 * Author: Tyler Chin
 * 
 * An animation loop akin to a gameloop in game development
 */
function animate() {
    requestAnimationFrame(animate);
    renderer.render(layer1, camera1);
    renderer.render(layer2, camera2);
    renderer.render(layer3, camera3);
    shootingStarsUpdate.forEach(update => update());
}

/**
 * Author: Tyler Chin
 * 
 * Move the camera based how much the website has been scrolled
 */
function moveCamera() {
    const t = -document.querySelector('main').getBoundingClientRect().top;
    
    let [x, y, z] = Array(3).fill(0);
    
    const moonTransition = 500; // t value to the end transitions
    const spaceTransition = 1800;

    // z function
    if (0 <= t && t < moonTransition) {
        z = t * 50 / moonTransition; // Moon position / transition
    } else if (moonTransition <= t && t < spaceTransition) {
        z = (19/26) * t + 50 - (4750/13);
    } else if (spaceTransition <= t){
        z = 1000;
    }

    let a = -24 / (2-Math.sqrt(2504));
    let c = 50;
    let d = -a * Math.sqrt(2504);

    // y function 
    if (0 <= t && t < moonTransition) {
        y = a * Math.sqrt(((z - c)**2) + 4) + d;
    } else {
        y = -24;
    }
    camera1.position.set(x, y, z);
    camera2.position.set(x, y, z);
    camera3.position.set(x, y, z);
    
}

/**
 * Author: Tyler Chin
 * 
 * Purpose: Creates a single star in the background in a random place between z = -200 to z = -1000
 * @param {int} dist1 Distance range where you want the stars
 * @param {int} dist2 Distance range where you want the stars
 */
function createStars(dist1, dist2) {
    let z = THREE.MathUtils.randInt(dist1, dist2);
    const y = THREE.MathUtils.randInt(-z, z);
    const x = camera1.aspect  * THREE.MathUtils.randInt(-z, z);


    // Add a specific number of elements to change manipulate the percentage of each colour chosen
    // This is out of 100
    let colors = new Array(50).fill(0xedf4ff);
    colors = colors.concat(new Array(35).fill(0xb5cff7));
    colors = colors.concat(new Array(5).fill(0xe0bb96));
    colors = colors.concat(new Array(5).fill(0xdb9f74));
    colors = colors.concat(new Array(5).fill(0xd9663d));

    const geoStar = new THREE.SphereGeometry(1, 10, 10);
    const mesh = new THREE.MeshBasicMaterial({ color: colors[THREE.MathUtils.randInt(0, colors.length - 1)] });
    const star = new THREE.Mesh(geoStar, mesh);
    star.position.set(x, y, z);
    layer1.add(star);
    stars.push(star)
    
}
/**
 * 
 * Set the lighting to illiuminate the moon to match its current phase
 * 
 * @param {DirectionalLight} light the light that illuminates the moon 
 */
function setDirectionalLight(light) {
    let phase = Moon.lunarPhase();
    
    switch (phase) {
        case "New":
            light.position.set(0,0,0);
            break;
        case "Waxing Crescent":
            light.position.set(3,2,2);
            break;
        case "First Quarter":
            light.position.set(3,2,0);
            break;
        case "Waxing Gibbous":
            light.position.set(3,2,-2);
            break;
        case "Full":
            light.position.set(0,0,-1);
            break;
        case "Waning Gibbous":
            light.position.set(-3,-2,-2);
            break;
        case "Last Quarter":
            light.position.set(3,2,0);
            break;
        case "Waning Crescent":
            light.position.set(3,2,1);
            break;
    }

    // Update moon phase when page loaded
    document.querySelector('#moon').innerHTML = "Today we have a " + phase.toLowerCase() + " moon";
    
}

/**
 * Create a shooting star in the sky relative to the camera position
 */
function createShootingStar() {
    let z = THREE.MathUtils.randInt(500, 700);
    let x;
    let y;
    if(THREE.MathUtils.randInt(0, 1)) {
        x = camera2.aspect * THREE.MathUtils.randInt(-600, 700);
        y = -z;
    } else {
        x =  camera2.aspect * z;
        y = THREE.MathUtils.randInt(-700, 800);
    }

    const sphere = new THREE.SphereGeometry(2, 32, 32);
    const mesh = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const shootingStar = new THREE.Mesh(sphere, mesh);
    shootingStar.position.set(x, y, z + camera2.position.z);
    layer2.add(shootingStar);

    const animation = () => {
        
        shootingStar.position.x -= 3 * camera2.aspect;
        shootingStar.position.y += 3;
    }

    setTimeout(() => {
            layer2.remove(shootingStar);
            shootingStarsUpdate.pop();
        }, 3000);
    shootingStarsUpdate.unshift(animation);

}


// MAIN
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// add a big moon
const geoSphere = new THREE.SphereGeometry(16, 32, 32);
const meshStripes = new THREE.MeshStandardMaterial({ color: 0xc2c2d6 });
const moon = new THREE.Mesh(geoSphere, meshStripes);
renderer.autoClear = false;

moon.position.set(0, 0, 50)
layer3.add(moon);


// add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
layer3.add(directionalLight);

setDirectionalLight(directionalLight);

// Moon backlighting
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, 1);
layer1.add(backLight);

// small ambient light so everything is visible
const ambientLight = new THREE.AmbientLight(0xffffff, 0.06);
layer3.add(ambientLight);

// Populate the background with stars
Array(200).fill().forEach(item => createStars(900, 1000));
Array(200).fill().forEach(item => createStars(200, 1000));
Array(100).fill().forEach(item => createStars(1900, 2000));
Array(100).fill().forEach(item => createStars(1200, 1500));

// Change the background color
layer1.background = new THREE.Color(0x1f1b24);

camera1.rotateX(Math.PI);
camera2.rotateX(Math.PI);
camera3.rotateX(Math.PI);

window.addEventListener("resize", () => { // For when the window has to resize
    stars.forEach(star =>  star.position.x = star.position.x / camera2.aspect);
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();

    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    stars.forEach(star =>  star.position.x = star.position.x * camera2.aspect);

    
})

/**
 * Spawn 1 to 3 shoot stars in the background every 3 seconds
 */
const shootingStarTimer = () => setTimeout(() => {
    shootingStarTimer();
    Array(THREE.MathUtils.randInt(2, 4)).fill().forEach(createShootingStar);
}, 1250);

shootingStarTimer();


document.querySelector('body').addEventListener('scroll', moveCamera);
window.addEventListener('scroll', moveCamera);
animate();
    