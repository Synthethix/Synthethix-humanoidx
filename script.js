// Initialize Three.js scene
let scene, camera, renderer;
let particles = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bgCanvas'),
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    // Create particles
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });

    for (let i = 0; i < 200; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.x = Math.random() * 100 - 50;
        particle.position.y = Math.random() * 100 - 50;
        particle.position.z = Math.random() * 100 - 50;
        particles.push(particle);
        scene.add(particle);
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    particles.forEach(particle => {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Initialize animation when window loads
window.addEventListener('load', init);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Timeline animation
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const timelineEvents = document.querySelectorAll('.timeline-event');

    timelineEvents.forEach((event, index) => {
        gsap.to(event, {
            scrollTrigger: {
                trigger: event,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleClass: 'show',
                once: true
            }
        });
    });
});
