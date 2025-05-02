import "./style.css"
import * as THREE from 'three';

function animate() {
    renderer.render(scene, camera);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

animate();
    