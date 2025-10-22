import '@/styles/colors.css'
import * as THREE from 'three';
import * as ThreeInfiniteGrid from '@chronosai/three-infinite-grid';

const rootElement = document.documentElement;
let rootStyles = getComputedStyle(rootElement);

let primaryColor = rootStyles.getPropertyValue('--color-primary').trim();
let primaryAccent = rootStyles.getPropertyValue('--color-primary-accent').trim();
let secondaryColor = rootStyles.getPropertyValue('--color-secondary').trim();
let backgroundColor = rootStyles.getPropertyValue('--color-bg').trim();

let mutationSinceLastFrame = false;


const config = { attributes: true, attributeFilter: ['data-theme'] };
const dataThemeChanged = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            rootStyles = getComputedStyle(rootElement);
            primaryColor = rootStyles.getPropertyValue('--color-primary').trim();
            primaryAccent = rootStyles.getPropertyValue('--color-primary-accent').trim();
            secondaryColor = rootStyles.getPropertyValue('--color-secondary').trim();
            backgroundColor = rootStyles.getPropertyValue('--color-bg').trim();
            mutationSinceLastFrame = true;
        }
    }
};

const observer = new MutationObserver(dataThemeChanged);
observer.observe(rootElement, config);

function InterpolatedColor(t: number, colorPrimary: string = primaryColor, colorSecondary: string = primaryAccent) {
    t = Math.max(0, Math.min(1, t));

    const r1 = parseInt(colorPrimary.slice(1, 3), 16);
    const g1 = parseInt(colorPrimary.slice(3, 5), 16);
    const b1 = parseInt(colorPrimary.slice(5, 7), 16);

    const r2 = parseInt(colorSecondary.slice(1, 3), 16);
    const g2 = parseInt(colorSecondary.slice(3, 5), 16);
    const b2 = parseInt(colorSecondary.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    const hex = `#${r.toString(16).padStart(2, '0')}${g
        .toString(16)
        .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return hex;
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById('hero-bg') as HTMLCanvasElement
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas
});

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
rootElement.getAttribute('data-theme') === 'dark' && (ambientLight.intensity = 1);
rootElement.getAttribute('data-theme') === 'light' && (ambientLight.intensity = 10);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight1.position.set(100, 100, 100);
directionalLight1.lookAt(0, 20, 0);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-100, 100, -100);
directionalLight2.lookAt(0, 20, 0);
scene.add(directionalLight2);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.parentElement!.clientWidth, canvas.parentElement!.clientHeight);

function addParticle() {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({
        color: InterpolatedColor(Math.random()),
        wireframe: true
    });
    const particle = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(400));
    particle.position.set(x!, 10 + y!, z!);
    particle.rotation.set(x!, y!, z!);

    scene.add(particle);
    return particle;
}
const particles = Array(400).fill(0).map(addParticle);

function addCenterpiece() {
    const geometry = new THREE.IcosahedronGeometry(5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: InterpolatedColor(0.5),
    })
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(0, 20, 0);
    scene.add(particle);
    return particle;
}

const centerpiece = addCenterpiece();

scene.background = new THREE.Color(backgroundColor);

function adjustRenderer() {
    renderer.setSize(canvas.parentElement!.clientWidth, canvas.parentElement!.clientHeight);
    camera.aspect = canvas.parentElement!.clientWidth / canvas.parentElement!.clientHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', adjustRenderer)

/**
 * Calculates position and rotation for the camera orbiting the origin of coordinates
 * @param t Number between 0 and 1 that represent the phase of the orbit
 * @param radius Radius of the orbit (optional, default: 10)
 * @param angle Angle of the orbit (optional, default: 0)
 * @returns [position, rotation] position and rotation of the camera
 */
function orbitCamera(t: number, radius: number = 10, angle: number = 0, offset: number = 0): number[] {
    t = Math.max(0, Math.min(1, t));

    const phi = angle * Math.sin(2 * Math.PI * t) * (Math.PI / 180) + offset;
    const theta = t * 2 * Math.PI;

    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(theta) * Math.cos(phi);

    const position: [number, number, number] = [x, y, z];

    return position;
}

// const gridHelper = new THREE.GridHelper(2000, 100, secondaryColor, secondaryColor);
const gridHelper = new ThreeInfiniteGrid.ThreeInfiniteGrid({
    chunks: new THREE.Vector2(100, 100),  //2000x2000 units size     
    plane: ThreeInfiniteGrid.PLANE.XZ,
    scale: 1,
    majorGridFactor: 10,
    minorLineWidth: 0.05,
    majorLineWidth: 0.075,
    axisLineWidth: 0.25,
    minorLineColor: new THREE.Color(secondaryColor),
    majorLineColor: new THREE.Color(secondaryColor),
    xAxisColor: new THREE.Color(primaryAccent),
    yAxisColor: new THREE.Color(primaryAccent),
    zAxisColor: new THREE.Color(primaryAccent),
    centerColor: new THREE.Color("#000000"),
    opacity: rootElement.getAttribute('data-theme') === 'dark' ? 1 : 0.3,
})
scene.add(gridHelper);

let delta = 0;
function renderLoop() {
    const position = orbitCamera(delta, -20, 10, 200);
    if (position) {
        camera.position.set(position[0]!, position[1]!, position[2]!);
    }
    camera.lookAt(0, 20, 0);

    if (mutationSinceLastFrame) {
        scene.background = new THREE.Color(backgroundColor);
        rootElement.getAttribute('data-theme') === 'dark' && (ambientLight.intensity = 1);
        rootElement.getAttribute('data-theme') === 'light' && (ambientLight.intensity = 10);
        rootElement.getAttribute('data-theme') === 'dark' && (gridHelper.opacity = 1);
        rootElement.getAttribute('data-theme') === 'light' && (gridHelper.opacity = 0.3);
        mutationSinceLastFrame = false;
    }

    for (const particle of particles) {
        particle.rotation.x += 0.03;
        particle.rotation.y += 0.01;
        particle.rotation.z += 0.05;
    }

    centerpiece.rotation.y += 0.001;

    delta += 0.0003;
    if (delta > 1) {
        delta = 0.0003;
    }

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(renderLoop);

export { renderer, renderLoop };