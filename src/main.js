import "./style.css"
import * as THREE from 'three';

import {Moon} from "lunarphase-js";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { element } from "three/tsl";

// GLOBAL ATTRIBUTES
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const stars = [];
const animationUpdate = []; // keep track of animations that need to be updated each frame using lambda functions

/**
 * Author: Tyler Chin
 * 
 * An animation loop akin to a gameloop in game development
 */
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    animationUpdate.forEach(update => update());
}

/**
 * Author: Tyler Chin
 * 
 * Move the camera based how much the website has been scrolled
 */
function moveCamera() {
    const t = document.querySelector('main').getBoundingClientRect().top;
    camera.position.z = t;
    if (0 <= t <= 100) {
        // ( -1 / 200 ) * (0.1 * t) * ( (0.1 * t) - 100)
    }

    
}

/**
 * Author: Tyler Chin
 * 
 * Creates a single star in the background in a random place between z = -900 to z = -1000
 */
function createBackgroundStars() {
    const z = THREE.MathUtils.randInt(-900, -1000);
    const y = THREE.MathUtils.randInt(-z, z);
    const x = camera.aspect * THREE.MathUtils.randInt(-z, z);

    // Add a specific number of elements to change manipulate the percentage of each colour chosen
    // This is out of 100
    let colors = new Array(50).fill(0xedf4ff);
    colors = colors.concat(new Array(35).fill(0xb5cff7));
    colors = colors.concat(new Array(5).fill(0xe0bb96));
    colors = colors.concat(new Array(5).fill(0xdb9f74));
    colors = colors.concat(new Array(5).fill(0xd9663d));

    const geoStar = new THREE.SphereGeometry(2, 10, 10);
    const mesh = new THREE.MeshBasicMaterial({ color: colors[THREE.MathUtils.randInt(0, colors.length - 1)] });
    const star = new THREE.Mesh(geoStar, mesh);
    star.position.set(x, y, z);
    scene.add(star);

    stars.push(star);
}

/**
 * Author: Tyler Chin
 * 
 * Purpose: Creates a single star in the background in a random place between z = -200 to z = -1000
 */
function createForegroundStars() {
    const z = THREE.MathUtils.randInt(-200, -1000);
    const y = THREE.MathUtils.randInt(-z, z);
    const x = camera.aspect  * THREE.MathUtils.randInt(-z, z);

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
    scene.add(star);

    stars.push(star);
}
/**
 * 
 * Set the lighting to illiuminate the moon to match its current phase
 * 
 * @param {DirectionalLight} light the light that illuminates the moon 
 */
function setDirectionalLight(light) {
    const phase = Moon.lunarPhase();
    
    switch (phase) {
        case "New":
            light.position.set(0,0,0);
            break;
        case "Waxing Crescent":
            light.position.set(3,-2,-2);
            break;
        case "First Quarter":
            light.position.set(3,-2,0);
            break;
        case "Waxing Gibbous":
            light.position.set(3,-2,2);
            break;
        case "Full":
            light.position.set(0,0,1);
            break;
        case "Waning Gibbous":
            light.position.set(-3,2,1);
            break;
        case "Last Quarter":
            light.position.set(-3,2,0);
            break;
        case "Waning Crescent":
            light.position.set(-3,2,-1);
            break;
    }

    
}


// MAIN
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Update moon phase when page loaded
document.querySelector('#moon').innerHTML = "Today we have a " + Moon.lunarPhase() + " moon";


// add big spinning sphere
const geoSphere = new THREE.SphereGeometry(16, 32, 32);
const meshStripes = new THREE.MeshStandardMaterial({ color: 0xc2c2d6 });
const moon = new THREE.Mesh(geoSphere, meshStripes);
// animationUpdate.push(() => { moon.rotation.x += 0.001; moon.rotation.y += 0.001; })
moon.position.set(0, 0, -50)
scene.add(moon);


// add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-1, 1, 1);
scene.add(directionalLight);

setDirectionalLight(directionalLight);

// small ambient light so everything is visible
const ambientLight = new THREE.AmbientLight(0xffffff, 0.04);
scene.add(ambientLight);

// Populate the background with stars
Array(200).fill().forEach(createForegroundStars);
Array(200).fill().forEach(createBackgroundStars);

// Change the background color
scene.background = new THREE.Color(0x1f1b24);

camera.position.setZ(0);

window.addEventListener("resize", () => { // For when the window has to resize
    stars.forEach(star =>  star.position.x = star.position.x / camera.aspect);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    stars.forEach(star =>  star.position.x = star.position.x * camera.aspect);
    
})
document.querySelector('body').addEventListener('scroll', moveCamera);
window.addEventListener('scroll', moveCamera);
animate();
    