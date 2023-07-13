import * as THREE from 'three';
import "./style.css"
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// scene
const scene = new THREE.Scene();

//  Geometry
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#ffff83",roughness:0.5, });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Light
const light1 = new THREE.PointLight(0xfffff, 1, 100);
light1.position.set(0, 10, 10)
light1.intensity = 1.25;
scene.add(light1);


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);



// Renderer
const canvas = document.getElementById("stage");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

// Resize
window.addEventListener("resize", () => {
    // Update size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
animate();

// timeline Magiccc
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// Mouse Animation Colorrr
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", (e) => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
    if (true) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255), 
            Math.round((e.pageY / sizes.height) * 255),
           150,
            
        ]
        // Let's animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        console.log(newColor)
        gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
    }
})