// Khởi tạo cảnh
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Ánh sáng môi trường
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Ánh sáng định hướng
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

// Tạo băng chuyền hình ảnh
const textureLoader = new THREE.TextureLoader();
const projects = [
  { img: "https://thanhtinh1997.github.io/AppTarotCard/tarot/card-back.jpg", title: "Project 1" },
  { img: "https://thanhtinh1997.github.io/AppTarotCard/tarot/card-back.jpg", title: "Project 2" },
  { img: "https://thanhtinh1997.github.io/AppTarotCard/tarot/card-back.jpg", title: "Project 3" },
];

// Hiển thị tooltip
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);

const geometry = new THREE.PlaneGeometry(1.5, 1.5);
const meshes = [];

// Tạo các slide hình ảnh
projects.forEach((project, i) => {
  const texture = textureLoader.load(project.img);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  // Sắp xếp theo vòng tròn
  const angle = (i / projects.length) * Math.PI * 2;
  mesh.position.x = Math.sin(angle) * 3;
  mesh.position.z = Math.cos(angle) * 3;
  mesh.lookAt(0, 0, 0); // Quay về trung tâm

  scene.add(mesh);
  meshes.push({ mesh, title: project.title });
});

// Đặt vị trí camera
camera.position.z = 7;

// Animation cho băng chuyền quay vòng
let rotation = 0;
function animate() {
  requestAnimationFrame(animate);

  rotation += 0.005;
  meshes.forEach((item, index) => {
    const angle = (index / projects.length) * Math.PI * 2 + rotation;
    item.mesh.position.x = Math.sin(angle) * 3;
    item.mesh.position.z = Math.cos(angle) * 3;
    item.mesh.lookAt(0, 0, 0); // Giữ hướng về trung tâm
  });

  renderer.render(scene, camera);
}
animate();

// Hiệu ứng hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    meshes.map((item) => item.mesh)
  );

  if (intersects.length > 0) {
    const object = intersects[0].object;
    const index = meshes.findIndex((item) => item.mesh === object);

    tooltip.style.display = "block";
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
    tooltip.innerText = meshes[index].title;

    // Phóng to slide khi di chuột
    object.scale.set(1.2, 1.2, 1.2);
  } else {
    tooltip.style.display = "none";
    meshes.forEach((item) => item.mesh.scale.set(1, 1, 1));
  }
});

// Xử lý khi thay đổi kích thước màn hình
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
