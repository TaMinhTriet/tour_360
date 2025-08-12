<template>
  <div class="mt-4">
    <img src="@/assets/banner3.jpg" alt="banner">
    
    <div class=" mb-4">
        <Videoskyflycam />
    </div>
    <div class="container mt-5 mb-2">
        <div class="row">
            <div class="col-md-6 mb-4">
                <h2>Khám phá không gian ảo bằng ứng dụng realsee </h2>
            </div>  
            <div class="col-md-6 mb-4">
                <div>
                    <div class="realsee-container">
                        <RealseeViewer />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="video-wrapper shadow rounded overflow-hidden">
                    <video
                        ref="video1"
                        class="w-100"
                        muted
                        @mouseenter="playVideo('video1')"
                        @mouseleave="pauseVideo('video1')"
                    >
                        <source src="https://res.cloudinary.com/dku2deoem/video/upload/v1745226414/video_ok_left_tlrbet.mp4" type="video/mp4" />
                        Trình duyệt không hỗ trợ video.
                    </video>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="video-wrapper shadow rounded overflow-hidden">
                    <video
                        ref="video2"
                        class="w-100"
                        muted
                        @mouseenter="playVideo('video2')"
                        @mouseleave="pauseVideo('video2')"
                    >
                        <source src="https://res.cloudinary.com/dku2deoem/video/upload/v1745226153/video_ok_qeenx7.mp4" type="video/mp4" />
                        Trình duyệt không hỗ trợ video.
                    </video>
                </div>
            </div>
        </div>
    </div>


    <h2 class="text-center">Xem sản phẩm 360°</h2>
    <div id="panorama" class="panorama-container"></div>
    <div class="text-center mt-3 mb-3">
      <button class="btn btn-primary mx-2" @click="toggleRotation">Bật/Tắt Xoay</button>
      <button class="btn btn-secondary mx-2" @click="reverseRotation">Đảo Chiều Xoay</button>
      <!-- <button onclick="viewer.enterVR()">Bật VR</button> -->
      <!-- <button class="btn btn-success mx-2" @click="toggleVR">Chế độ VR</button> -->
    </div>

    <!-- Component model -->
    <modelComponent
        modalId="hotspotmodel"
        :title="currentmodelData?.title || 'Thông tin'"
        :subtitle="currentmodelData?.subtitle || 'Chi tiết'"
        :iframeSrc="currentmodelData?.iframeSrc"
        :infoList="currentmodelData?.infoList || []"
        :description="currentmodelData?.description"
        :features="currentmodelData?.features || []"
        @close="closemodel"
    />
  <!-- </div> -->
</div>
    
</template>

<script>


export default {
  components: { modelComponent },
  setup() {
    const selectedIframeSrc = ref('');

    const openmodel = (iframeLink) => {
      selectedIframeSrc.value = iframeLink; // Gán link động cho model
      const mymodel = new BootstrapModal(document.getElementById('hotspotmodel')); // Sử dụng BootstrapModal
      mymodel.show();
    };

    // const closemodel = () => {
    // const modelElement = document.getElementById('hotspotmodel');
    // if (modelElement) {
    //     const model = model.getInstance(modelElement) || new model(modelElement);
    //     model.hide();
    // }
    // };

    return { openmodel, selectedIframeSrc };
  }
};
</script>

<!-- </template> -->
<script setup>
  import { onMounted, ref, nextTick } from 'vue';
  import { Modal as BootstrapModal } from 'bootstrap'; // Đổi tên biến để tránh xung đột
  import modelComponent from '@/components/FormModel3D.vue';
  import Videoskyflycam from '@/components/sky.vue';
  import RealseeViewer from '@/components/realsee.vue';
// Dữ liệu cho các model
const hotspotmodels = {
  model1: {
    iframeSrc: "https://sketchfab.com/models/e58094d8ec824a988712b90b944d4de9/embed",
    title: "Bia đá",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Bia đá đình Bình Thủy (Cần Thơ) có hình vuông, đặt trên bệ hoa sen, được chạm khắc tinh xảo. Trên bia ghi lại công đức và lịch sử của đình, thể hiện giá trị văn hóa, tín ngưỡng lâu đời của vùng đất Tây Nam Bộ.",
    features: ["Bia đá", "Chạm khắc tinh xảo"]
  },
  model2: {
    iframeSrc: "https://sketchfab.com/models/b10237534ba14feda1090c791b7adf27/embed",
    title: "lưu hương và khối gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Bàn thờ truyền thống với bộ đồ thờ bằng đồng gồm một lư hương lớn ở giữa và hai chân nến hai bên. Bàn thờ được phủ bằng khăn đỏ thêu hình rồng vàng và họa tiết trang trí ở giữa, thể hiện nét văn hóa đặc trưng trong tín ngưỡng thờ cúng của người Việt.",
    features: ["Đồng", "Chạm khắc tinh xảo"]
  },
  model3: {
    iframeSrc: "https://sketchfab.com/models/5b572182004344ec99978c2c3c7233f3/embed",
    title: "Tượng hình voi",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Tượng hình voi được thiết kế như một chiếc ghế hoặc bệ đỡ trang trí. Tượng có màu nâu với các chi tiết hoa văn màu xanh và trắng, phía trên có mặt phẳng có thể dùng để đặt vật dụng. Bức tượng được làm bằng gốm hoặc sứ và đặt trên nền gạch.",
    features: ["Gốm hoặc sứ", "Chạm khắc tinh xảo"]
  },
  model4: {
    iframeSrc: "https://sketchfab.com/models/70f79b24138347ffb7e269984e0f9e91/embed",
    title: "Lưu hương lớn",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Bàn thờ truyền thống được phủ khăn đỏ có họa tiết rồng vàng, tượng trưng cho sự linh thiêng và trang trọng. Trên bàn đặt một lư hương lớn bằng đồng, xung quanh là các chân nến, lọ hoa sen và mâm lễ vật gồm trái cây, bánh mứt… thể hiện lòng thành kính dâng lên tổ tiên hoặc thần linh. Không gian thờ cúng này mang đậm nét văn hóa tâm linh của người Việt, vừa trang nghiêm vừa ấm cúng.",
    features: ["Đồng", "Chạm khắc tinh xảo"]
  },
  model5: {
    iframeSrc: "https://sketchfab.com/models/b14563dd45b6403584e2421ab402fec2/embed",
    title: "Tượng thần tài",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Đây là tượng Thần Tài – một vị thần trong tín ngưỡng dân gian Á Đông, đặc biệt phổ biến ở Việt Nam và Trung Quốc. Tượng được trang trí với màu sắc rực rỡ, mặc trang phục cổ truyền, đầu đội mũ quan, tay cầm gậy như ý và thỏi vàng, biểu tượng cho sự thịnh vượng và phát tài. Tượng thường được đặt trong nhà, cửa hàng hoặc trên bàn thờ để cầu mong may mắn và tài lộc.",
    features: ["Gốm hoặc sứ", "Chạm khắc tinh xảo"]
  },
  model6: {
    iframeSrc: "https://sketchfab.com/models/8da06933c87f495f9203cdec2554f37e/embed",
    title: "Tượng thần canh gác đình",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Đây là tượng một vị tướng hoặc thần hộ pháp trong tín ngưỡng dân gian. Tượng được tô vẽ rực rỡ, mặc áo giáp với họa tiết trang nghiêm, đầu đội mũ chiến binh, tay cầm rìu ở cả hai bên – biểu tượng cho sức mạnh và sự bảo vệ. Gương mặt dữ dằn, râu rậm và dáng đứng uy nghi thể hiện rõ hình ảnh của một vị thần canh giữ hoặc trấn giữ, thường được đặt tại đình, đền, miếu hoặc trước bàn thờ để xua đuổi tà ma và bảo vệ bình an.",
    features: ["Gốm hoặc sứ", "Chạm khắc tinh xảo"]
  },
  model7: {
    iframeSrc: "https://sketchfab.com/models/5d81737d5ec149e3b5d36c8abbc7dc88/embed",
    title: "Khối gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Chất liệu tượng là gỗ được chạm khắc công phu, mang phong cách nghệ thuật truyền thống, có thể bắt nguồn từ một truyền thuyết dân gian hoặc tác phẩm điêu khắc nghệ thuật tâm linh.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model8: {
    iframeSrc: "https://sketchfab.com/models/59e4b9074539416783aa079bd7550e08/embed",
    title: "Gỗ bông sen",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Cấu trúc tượng có thể mang tính biểu tượng liên quan đến tín ngưỡng phồn thực hoặc nghi lễ dân gian cổ xưa, thường thấy trong văn hóa Đông Nam Á, đặc biệt là trong các lễ hội cầu mùa hoặc tôn vinh sinh khí. Bệ tượng được đặt trên nền hình tròn như một mâm lễ.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model9: {
    iframeSrc: "https://sketchfab.com/models/a8d2f000f85b4224ba8d801d47e5d00f/embed",
    title: "Bình màu xanh",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Đây là một chiếc bình gốm có thân hình bầu, được tráng men xanh ngọc với hoa văn nổi tinh xảo bao quanh thân. Đế bình to, chắc chắn, giúp bình đứng vững. Toàn bộ bề mặt được phủ lớp men bóng, tạo cảm giác cổ kính và sang trọng, gợi nhớ đến phong cách gốm truyền thống Việt Nam hoặc Trung Hoa.",
    features: ["Gốm hoặc sứ màu xanh", "Chạm khắc tinh xảo"]
  },
  model10: {
    iframeSrc: "https://sketchfab.com/models/3170d21a2ec14f7c99816d936932194f/embed",
    title: "Cổ vật",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Tượng thú linh mang hình dáng sư tử, được sơn màu đen chủ đạo, điểm các chi tiết vàng và đỏ nổi bật. Tác phẩm thể hiện phong cách nghệ thuật truyền thống, thường thấy trong văn hóa tâm linh Đông Nam Á. Tư thế đứng uy nghi thể hiện sự dũng mãnh và bảo hộ.",
    features: ["Gốm hoặc sứ", "Chạm khắc tinh xảo"]
  },
  model11: {
    iframeSrc: "https://sketchfab.com/models/4db2286a59944686a7f63e85471cee88/embed",
    title: "Tượng con cá gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Tượng cá chép gỗ được chạm khắc công phu, thể hiện hình ảnh cá chép mạnh mẽ vươn lên giữa làn sóng cuộn trào. Với màu gỗ nâu trầm bóng loáng, thân cá phủ đầy vảy sắc nét, tượng trưng cho sự bền bỉ và kiên cường. Cá chép là linh vật phong thủy tượng trưng cho may mắn, tài lộc và công danh, thường được trưng trong nhà hoặc văn phòng như một lời chúc thăng tiến, vượt khó hóa rồng.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model12: {
    iframeSrc: "https://sketchfab.com/models/9de18294aeb948d9ab384a6ce577cc24/embed",
    title: "Kỳ lân",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Tượng Kỳ Lân với hình dáng oai phong: thân hình uyển chuyển như sư tử, đầu lớn, miệng há rộng nở nụ cười, cùng đôi mắt to tròn đầy thần thái. Đuôi uốn cong cao vút, tạo thành hình ngọn lửa, biểu trưng cho khí thiêng. Từng đường nét trên thân Kỳ Lân được chạm khắc tinh xảo, mang đậm chất nghệ thuật dân gian. Kỳ Lân là linh vật biểu trưng cho điềm lành, trí tuệ và sự bảo hộ, thường đặt tại các đền đài, miếu mạo hoặc lăng tẩm để trấn trạch và thu hút cát khí.",
    features: ["Gốm hoặc sứ", "Chạm khắc tinh xảo"]
  },
  model13: {
    iframeSrc: "https://sketchfab.com/models/940d314a64c1488093869751d8add38c/embed",
    title: "Trống đồng",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Chiếc trống đồng được chế tác tinh xảo với mặt trống chạm khắc các hoa văn hình học, hình chim Lạc bay và cảnh sinh hoạt cổ. Thân trống hình nấm, chia thành nhiều tầng rõ rệt. Trống đồng không chỉ là nhạc cụ cổ, mà còn là biểu tượng của quyền lực và tín ngưỡng người Việt cổ, thường dùng trong các nghi lễ quan trọng như lễ hội, cầu mưa, hoặc các nghi thức tôn giáo.",
    features: ["Đồng", "Chạm khắc tinh xảo"]
  },
  model14: {
    iframeSrc: "https://sketchfab.com/models/9f891125f59146b2b5f0a21a61b7cc2d/embed",
    title: "Tượng chim đại bàng gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Tác phẩm điêu khắc thể hiện hình ảnh một con đại bàng oai phong đang vươn mình bay lên giữa làn mây hoặc sóng cuộn. Với màu sắc chuyển dần từ nâu trầm sang đỏ cam rực rỡ, tượng mang đậm chất phong thủy, thể hiện khát vọng vươn cao, quyền lực và sự kiên cường. Đây là một vật phẩm trang trí mang ý nghĩa may mắn, thường được trưng bày trong phòng khách hoặc phòng làm việc.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model15: {
    iframeSrc: "https://sketchfab.com/models/5f87ed8f5d9648a0b1f8ee40508450df/embed",
    title: "Bia khắc trước cổng",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Đây là một phần bức bình phong gốm được trang trí công phu với hình ảnh chim phượng, hoa lá và họa tiết truyền thống. Nền chính được tô viền đỏ, hai bên có cột trụ màu vàng tạo cảm giác đối xứng. Mảng gốm chính ở giữa mô tả một cảnh sinh động, mang đậm tính biểu tượng và mỹ thuật dân gian.",
    features: ["ĐÁ", "Chạm khắc tinh xảo"]
  },
  model16: {
    iframeSrc: "https://sketchfab.com/models/d08ba4fb04b2402ca7daeeeb0d04200b/embed",
    title: "Lưu hương lộc",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Bàn thờ truyền thống với bộ đồ thờ bằng đồng gồm một lư hương lớn ở giữa và hai chân nến hai bên. Bàn thờ được phủ bằng khăn đỏ thêu hình rồng vàng và họa tiết trang trí ở giữa, thể hiện nét văn hóa đặc trưng trong tín ngưỡng thờ cúng của người Việt.",
    features: ["Đồng", "Chạm khắc tinh xảo"]
  },
  model17: {
    iframeSrc: "https://sketchfab.com/models/f26410a0ae8a42f09f5316be81089762/embed",
    title: "Tượng gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Chất liệu tượng là gỗ được chạm khắc công phu, mang phong cách nghệ thuật truyền thống, có thể bắt nguồn từ một truyền thuyết dân gian hoặc tác phẩm điêu khắc nghệ thuật tâm linh.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model18: {
    iframeSrc: "https://sketchfab.com/models/5d81737d5ec149e3b5d36c8abbc7dc88/embed",
    title: "Khối gỗ",
    infoList: [
      { label: "Vị trí", value: "Cần Thơ" },
      { label: "Năm xây dựng", value: "1844" }
    ],
    description: "Chất liệu tượng là gỗ được chạm khắc công phu, mang phong cách nghệ thuật truyền thống, có thể bắt nguồn từ một truyền thuyết dân gian hoặc tác phẩm điêu khắc nghệ thuật tâm linh.",
    features: ["Gỗ quý", "Chạm khắc tinh xảo"]
  },
  model19: {
    iframeSrc: "https://drive.google.com/file/d/1j0JJbR3w03ap51P7O2jtzgvC9k_N25_K/view?usp=sharing",
    
  },
 

   
}
const currentmodelData = ref(null);
let viewer = null;
const autoRotate = ref(true);
let yaw = 0;
let rotateSpeed = 0.5;
let animationFrameId = null;


// const openmodel = (modelId) => {
//   currentmodelData.value = hotspotmodels[modelId];
//   new model(document.getElementById('hotspotmodel')).show();
// };

const openmodel = (modelKey) => {
    currentmodelData.value = hotspotmodels[modelKey];
   
    nextTick(() => {
    const modelEl = document.getElementById('hotspotmodel');
    if (modelEl) {
        const model = new BootstrapModal(modelEl);
        // const model = model.getOrCreateInstance(modelEl);
        // const model = model.getInstance(modelEl) || new model(modelEl);
        model.show();
    }
    });
};
const closemodel = () => {
  const modelElement = document.getElementById('hotspotmodel');
  if (modelElement) {
    let model = BootstrapModal.getInstance(modelElement);
    if (model) {
      model.hide();
    }
  }
};
function hotspotCustom(hotSpotDiv, args) {
    hotSpotDiv.classList.add('hotspot-hover');
    

    // Container giữ icon để dễ định vị
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('hotspot-icon-wrapper');
    
    let img = document.createElement("img");
    img.src = args.imageSrc;
    img.classList.add("hotspot-icon");
    img.style.width = "50px"; // Điều chỉnh kích thước
    img.style.height = "50px";
    // img.style.transition = "transform 0.3s ease";
    img.style.transformOrigin = "center center"; // Phóng to từ chính giữa

    // Hiệu ứng hover bằng JS
    img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.2)";
    });
    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
    });

    hotSpotDiv.appendChild(img);

    //sự kiện lia chuột

    // Tạo tooltip (ẩn lúc đầu)
    if (args.text) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('custom-tooltip');
        tooltip.innerText = args.text;


        // Style tooltip
        tooltip.style.position = "absolute";
        tooltip.style.bottom = "110%"; // cao hơn icon
        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
        tooltip.style.color = "#fff";
        tooltip.style.padding = "8px 12px";
        tooltip.style.borderRadius = "6px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.fontSize = "14px";
        tooltip.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
        tooltip.style.opacity = "0";
        tooltip.style.pointerEvents = "none";
        tooltip.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        tooltip.style.zIndex = "100";

        // Hover để hiện tooltip
        img.addEventListener("mouseenter", () => {
            tooltip.style.opacity = "1";
            tooltip.style.transform = "translateX(-50%) translateY(-4px)";
        });
        img.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            tooltip.style.transform = "translateX(-50%)";
        });
        tooltip.style.display = 'none';
        tooltip.style.backgroundColor = "rgba(31, 214, 27, 0.8)";
        // tooltip.style.color = white;
        hotSpotDiv.appendChild(tooltip);

        // Sự kiện hover
        hotSpotDiv.onmouseover = () => {
            tooltip.style.display = 'block';
        };
        hotSpotDiv.onmouseout = () => {
            tooltip.style.display = 'none';
        };
    
}
  }
//   function openmodel() {
//     setTimeout(() => {
//       const modelElement = document.getElementById("mymodel");
//       if (modelElement) {
//         const modelInstance = new model(modelElement);
//         modelInstance.show();
//       } else {
//         console.error("Lỗi: model không tồn tại!");
//       }
//     }, 300);
//   } 
  // Hàm xoay ảnh tự động
  function startRotation() {
    if (autoRotate.value) {
      yaw += rotateSpeed;
      if (yaw > 360) yaw -= 360;
      viewer.setYaw(yaw);
      animationFrameId = requestAnimationFrame(startRotation);
    }
  }
  
  // Bật / tắt xoay ảnh
  function toggleRotation() {
    autoRotate.value = !autoRotate.value;
    if (autoRotate.value) {
      startRotation();
    } else {
      cancelAnimationFrame(animationFrameId);
    }
  }

  // Đảo chiều xoay
  function reverseRotation() {
    rotateSpeed = -rotateSpeed;
  }
  // Khởi tạo Pannellum khi component được mounted
  onMounted(() => {
    // if (navigator.xr && navigator.xr.isSessionSupported) {
    // navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    //   if (supported) {
    //     alert("Thiết bị của bạn hỗ trợ chế độ VR. Hãy nhấn nút VR ở góc phải dưới để kích hoạt.");
    //   } else {
    //     console.log("Thiết bị không hỗ trợ VR");
    //   }
    // });
    // }

    viewer = pannellum.viewer('panorama', {
      default: {
        firstScene: "scene1",
        autoLoad: true,
        autoRotate: 0,
        type: 'equirectangular',
        hfov: 100, 
        yaw: 0,
        minYaw: -360,
        maxYaw: 360,
        minPitch: -90,
        maxPitch: 90,
        hotSpotDebug: true,
        // Thêm cấu hình VR
        // vr: true
        // showVRCtrl: true, // ← Bật nút VR
        // showControls: true, // ← Hiển thị các nút control (zoom, fullscreen, VR...)
    },
    scenes: {
        "scene1": {// san_1
            type: "equirectangular",
            //panorama:"pannellum/image/image_360/Dinh_2_4.jpg",
            panorama: "https://ibb.co/N2LJDv8n",
            hotSpots: [
                {
                    pitch: -5.288059047660797, yaw: 4.822458376531989,
                    type: "custom",
                    cssClass: "custom-hotspot",
                    createTooltipFunc: hotspotCustom,
                    createTooltipArgs: {
                        imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png"
                    },
                    clickHandlerFunc: function() {
                        viewer.loadScene("scene2");
                    }
                },
                {
                pitch: 10.602115262879733, yaw: -14.575491530935082,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Bia khắc trước cổng",
                },
               
                clickHandlerFunc: () => openmodel('model15') // Mở model đình 1       
            },
                
            ]
        },
        "scene2": { //san_2
            type: "equirectangular",
            panorama: "https://ibb.co/5grxS7kf", // Fixed path
            hotSpots: [
            {
                //tro ve san 1
                pitch: -7.515813447458353,
                yaw: 0.7776918234160708,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene1");
                }
            },
            {
                //di den san 3
                pitch: -4.773829264834361, yaw: 158.02640302655286,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene3");
                }
            },
            
            {
                //di den dinh 1
                pitch: -3.2994573833507896, yaw: -179.56145980144154,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            },
            {
                pitch: 13.984733353196255, yaw: 32.03712316048483,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Bia khắc trước cổng",
                },
               
                clickHandlerFunc: () => openmodel('model15') // Mở model đình 1       
            },
           
            
            {
                pitch: 48.536837118693285, yaw: 157.46174784865065,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    // viewer.loadScene("scene23");
                    openmodel('model19')   
                }      
            },     
            ]
        },
        "scene23": { //san_2
            type: "equirectangular",
            panorama: "/pannellum/image/image_360/dji_fly_20250124_111836_814_1738487235762_quickshot.mp4", // Fixed path
            video: {
                enable: true,  // Kích hoạt tính năng video
                loop: true,    // Lặp lại video
                autoplay: true,  // Tự động phát video khi load
            },
            hotSpots: [
            {
                //tro ve san 1
                pitch: -7.515813447458353,
                yaw: 0.7776918234160708,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene1");
                }
            }, 
            ]
        },
        "scene3": { //san_3
            type: "equirectangular",
            panorama: "pannellum/image/Image360_final/san3_2.jpg", // Fixed path
            hotSpots: [
            {
                // di den san 2
                pitch: -6.22776769360131, yaw: 153.79065378215358,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene2");
                }
            },
            {
                //di den san 4
                pitch: -9.681505472456209, yaw: -154.24556022674798,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene4");
                }
            },
            {
                //di vao nha_1
                pitch: -5.059455592340203, yaw: 28.039196956607125,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            },
            {
                    pitch: 7.868376585236286, yaw: -176.8122868572032,
                    type: "custom",
                    cssClass: "custom-hotspot",
                    createTooltipFunc: hotspotCustom,
                    createTooltipArgs: {
                        imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                        text: "Bia đá",
                    },
                    
                    clickHandlerFunc: () => openmodel('model1')     
            },
            ]
        },
        "scene4": { //san_4
            type: "equirectangular",
            panorama: "https://ibb.co/4RTvjZz5", // Fixed path
            hotSpots: [
            {
                // di den san 3
                pitch: -5.746508884971536, yaw: 19.968273210657483,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene3");
                }
            },
            ]
        },
        "scene5": { //Dinh_1
            type: "equirectangular",
            panorama: "https://ibb.co/7xkvSBy2", // Fixed path
            hotSpots: [
            //Pitch: -30.91344817148359, Yaw: 172.5966473201301
            {
                //di den san 2
                pitch: -30.91344817148359, yaw: 172.5966473201301,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene2");
                }
            },
            {
                //di den dinh 2
                pitch: -28.193920058065093, yaw: -94.06884273382187,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene6");
                }
            },
            
            {
                // di den dinh 4
                pitch: -37.99984580836123, yaw: 9.12511233527772,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene8");
                }
            },
            ]
        },
        "scene6": { //Dinh_2
            type: "equirectangular",
            panorama: "https://ibb.co/bgkQ1ZZh", // Fixed path
            // panorama: "pannellum/image/image_360/dinh2.jpg",
            hotSpots: [
            {
                // di den dinh 1
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            },
            {
                //di den dinh 3
                pitch: -20.770497249706892, yaw: -72.91644293496073,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene7");
                }
            }
            ]
        },
        "scene7": { //Dinh_3
            type: "equirectangular",
            panorama: "https://ibb.co/60CXQBxs", // Fixed path
            hotSpots: [
            {
                // di den dinh 2
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene6");
                }
            },
            {
                //di den dinh 6
                pitch: -41.29656790316309, yaw: 8.461094946491688,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene10");
                }
            },
            {
                pitch: 23.737091748294237, yaw: 14.328365578480952,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Gỗ bông sen",
                },
             
                clickHandlerFunc: () => openmodel('model8')     
            },
         
            
            ]
        },
        "scene8": { //Dinh_4
            type: "equirectangular",
            panorama: "https://ibb.co/bRKCBMR5", // Fixed path
            hotSpots: [
            {
                // di den dinh 1
                pitch: -42.62921650656654, yaw: -177.8040351923422,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            },
            {
                //di den dinh 5
                pitch: -23.709749280336084, yaw: -90.72784844493194,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene9");
                }
            },
            {
                //di den dinh 7
                pitch: -31.77223391931523, yaw: 9.706865509593882,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene11");
                }
            },
            {
                pitch: 8.96729296593148, yaw: 2.3600214036740397,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Lưu hương và khối gỗ",
                },
                
                clickHandlerFunc: () => openmodel('model2')     
             },
             
          
            ]
        },
        "scene9": { //Dinh_5
            type: "equirectangular",
            panorama: "https://ibb.co/nM6x95vV", // Fixed path
            hotSpots: [
            {
                // di den dinh 4
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene8");
                }
            },
            {
                //di den dinh 6
                pitch: -19.94778922446892, yaw: -78.1285763422206,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene10");
                }
            }
            ]
        },
        "scene10": { //Dinh_6
            type: "equirectangular",
            panorama: "https://ibb.co/Txzn0cY5", // Fixed path
            hotSpots: [
            
            {
                //di den dinh 3
                pitch: -40.104152027957454, yaw: -179.91276079006443,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene7");
                }
            },
            {
                // di den dinh 5
                pitch: -22.944833572498833, yaw: 95.2307525567565,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene9");
                }
            },
            {
                //di den dinh 9
                pitch: -39.602613632208254, yaw: 3.560137172652679,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            },
            {
                pitch: 25.73642090495069, yaw: -179.94955648549416,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Gỗ bông sen",
                },
                
                clickHandlerFunc: () => openmodel('model8')     
            },
           
           
            ]
        },
        "scene11": { //Dinh_7
            type: "equirectangular",
            panorama: "https://ibb.co/3yk4Yzyb", // Fixed path
            hotSpots: [
            {
                // di den dinh 4
                pitch: -40.27202817936073, yaw: 179.7363251411303,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene14");
                }
            },
            {
                //di den dinh 8
                pitch: -24.771429947119476, yaw: 100.75109031882437,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene12");
                }
            },
            {
                //di den dinh 10
                pitch: -38.39309991461191, yaw: 8.47587322883794,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene8");
                }
            },
            {
                pitch: 5.192018460182477, yaw: -178.44108804918218,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Lưu hương và khối gỗ",
                },
                
                clickHandlerFunc: () => openmodel('model2')     
             },
             {
                pitch: 1.7963151578778374, yaw: -119.6832143689803,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Tượng chim đại bàng gỗ",
                },
                
                clickHandlerFunc: () => openmodel('model14')     
            },
            {
                pitch: -4.425745878077564, yaw: -57.99036386929309,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Tượng con cá gỗ",
                },
                clickHandlerFunc: () => openmodel('model11')     
            },
            {
                pitch: -26.456637085438597, yaw: 130.18623383842402, 
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Tượng hình voi",
                },
                
                clickHandlerFunc: () => openmodel('model3')     
             },
           
            
            ]
        },
        "scene12": { //Dinh_8
            type: "equirectangular",
            // panorama: "pannellum/image/image_360/Dinh_8.jpg", // Fixed path
            panorama: "https://ibb.co/4gJZfVgr",
            hotSpots: [
            {
                // di den dinh 7
                pitch: -20.259799402291986, yaw: -63.96019342819967,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene11");
                }
            },
            {
                //di den dinh 9
                pitch: -20.701800495272927, yaw: 71.38609434289923,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            },
            {
                pitch: -17.67332218766135, yaw: -91.80506945991789,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                text: "Xem mô hình 3D",
                clickHandlerFunc: () => openmodel('model3')     
             },
             {
                pitch: -17.914125078851423, yaw: 97.59888479378313, 
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                text: "Xem mô hình 3D",
                clickHandlerFunc: () => openmodel('model3')     
             },
            
             
             {
                pitch: -9.064528492898223, yaw: 150.14520604421017,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    text: "Bình màu xanh",
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                
                clickHandlerFunc: () => openmodel('model9')     
            },
            
           
         
            ]
        },
        "scene13": { //Dinh_9
            type: "equirectangular",
            // panorama: "pannellum/image/image_360/Dinh_9.jpg", // Fixed path
            panorama: "https://ibb.co/Q7DFDHLd", 
            hotSpots: [
            {
                // di den dinh 6
                pitch: -34.698916454488625, yaw: -173.30245362917935,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene10");
                }
            },
            {
                //di den dinh 8
                pitch: -23.059803610849993, yaw: 90.39946047184766,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene12");
                }
            },
            {
                //di den dinh 12
                pitch: -38.87955281710633, yaw: 1.3249261185455805,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene16");
                }
            },
            {
                pitch: 15.827335413939537, yaw: 4.733756867951531,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    text: "Tượng gỗ",
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                
                clickHandlerFunc: () => openmodel('model17')     
            },
            {
                pitch: -20.567009125964486, yaw: 60.7425842063177, 
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                text: "Xem mô hình 3D",
                clickHandlerFunc: () => openmodel('model3')     
             },
             
             
            ]
        },
        "scene14": { //Dinh_10
            type: "equirectangular",
            panorama: "https://ibb.co/bRbhYQ6r", // Fixed path
            hotSpots: [
            {
                // di den dinh 7
                pitch: -16.89757449897152, yaw: -176.3081662451436,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene11");
                }
            },
            {
                //di den dinh 11
                pitch: -22.641272713167353, yaw: -89.45153740671351,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene15");
                }
            },
            {
                //di den dinh 13
                pitch: -24.641570723548902, yaw: -3.3523788479047116,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene17");
                }
            },
            {
                pitch: 1.8868482717399164, yaw: -173.62843699429789,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    text: "khối gỗ",
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
                
                clickHandlerFunc: () => openmodel('model18')     
            },
           
            ]
        },
        "scene15": { //Dinh_11
            type: "equirectangular",
            // panorama: "pannellum/image/image_360/Dinh_11.jpg", // Fixed path
            panorama: "https://ibb.co/ZpPD8zsn",
            hotSpots: [
            {
                // di den dinh 10
                pitch: -20.530369525357717, yaw: 90.63949709103541,
                
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene14");
                }
            },
            {
                //di den dinh 12
                pitch: -22.281426584293904, yaw: -85.0584341996688,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene16");
                }
            },
            {
                pitch: 13.20256352579285, yaw: 3.694013224662349,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    text: "Lưu hương lộc",
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png"
                },
               
                clickHandlerFunc: () => openmodel('model16')     
            },
            ]
        },
        "scene16": { //Dinh_12
            type: "equirectangular",
            panorama: "https://ibb.co/jkMrkf3g", // Fixed path
            hotSpots: [
            {
                // di den dinh 9
                pitch: -17.115222405914785, yaw: -177.01629104276128,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene19");
                }
            },
            {
                //di den dinh 11
                pitch: -24.442437576292726, yaw: -81.82925419786203,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene15");
                }
            },
            {
                //di den dinh 15
                pitch: -14.964066993506982, yaw: -1.6009059644045927,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            }
            ]
        },
        "scene17": { //Dinh_13
            type: "equirectangular",
            panorama: "https://ibb.co/yFsmV57n",  // Fixed path
            hotSpots: [
            {
                // di den dinh 10
                pitch: -12.072900196201434, yaw: 173.8013828724154,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene14");
                }
            },
            {
                //di den dinh 14
                pitch: -24.08173317855537, yaw: -95.72590413099685,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene18");
                }
            },
            {
                //di den dinh 16
                pitch: -12.651613971270564, yaw: 8.560807212052529,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene20");
                }
            },
            {
                pitch: 17.3745804077964, yaw: -26.737241288996366,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Tượng thần tài",
                },
                
                clickHandlerFunc: () => openmodel('model5')     
             },
            
            ]
        },
        "scene18": { //Dinh_14
            type: "equirectangular",
            panorama: "https://ibb.co/qYWy1s1v", // Fixed path
            hotSpots: [
            {
                // di den dinh 13
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene17");
                }
            },
            {
                //di den dinh 15
                pitch: -24.069774562680323, yaw: -82.8484358445055,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene19");
                }
            },
            {
                pitch: 30.445365987148715, yaw: 3.517489249218122,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Lưu hương lớn",
                },
                
                clickHandlerFunc: () => openmodel('model4')     
            },
          
            ]
        },
        "scene19": { //Dinh_15
            type: "equirectangular",
            panorama: "https://ibb.co/Rp08tXvr", // Fixed path
            hotSpots: [
            {
                // di den dinh 12
                pitch: -19.02268882331726, yaw: -174.59461778795009,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene16");
                }
            },
            {
                //di den dinh 14
                pitch: -22.561670510293737, yaw: 96.23816259288034,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene18");
                }
            },
            {
                //di den dinh 18
                pitch: -18.189314203642983, yaw: 0.0166948668164264,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene22");
                }
            },
            {
                pitch: 15.445370112237589, yaw: 32.73235766903437,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220189/infor2_qgmo1f.png",
                    text: "Tượng thần canh gác đình",
                },
                
                clickHandlerFunc: () => openmodel('model6')     
             },
            
            ]
        },
        "scene20": { //Dinh_16
            type: "equirectangular",
            panorama: "https://ibb.co/SXNV1DYM", // Fixed path
            hotSpots: [
            {
                // di den dinh 13
                pitch: -14.788819490429315, yaw: -178.025907234413,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene17");
                }
            },
            {
                //di den dinh 17
                pitch: -21.040575188110125, yaw: -85.12605932931474,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene21");
                }
            }
            ]
        },
        "scene21": { //Dinh_17
            type: "equirectangular",
            panorama: "https://ibb.co/cz4PdB4", // Fixed path
            hotSpots: [
            {
                // di den dinh 16
                pitch: -20.52665969151568, yaw: 101.85366596119269,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene20");
                }
            },
            {
                //di den dinh 18
                pitch: -20.34123110270846, yaw: -93.20733131421419,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene22");
                }
            }
            ]
        },
        "scene22": { //Dinh_18
            type: "equirectangular",
            // panorama: "pannellum/image/image_360/Dinh_18.jpg", // Fixed path
            panorama: "https://ibb.co/v4mqmwTx", 
            hotSpots: [
            {
                // di den dinh 15
                pitch: -11.504141274542402, yaw: -178.3106506773007,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene19");
                }
            },
            {
                //di den dinh 17
                pitch: -20.512653131224486, yaw: 91.77080784582125,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "https://res.cloudinary.com/dku2deoem/image/upload/v1745220086/Arrow_Top_ykdke0.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene21");
                }
            }
            ]
        }
      }
    });
 
    startRotation();
  });
  // const modelElement = document.getElementById('mymodel');
  // if (modelElement) {
  //     modelElement.classList.add('show'); // Mở model
  // } else {
  //     console.error("Lỗi: Không tìm thấy phần tử model!");
  // }
  // Hàm tạo hotspot tùy chỉnh
  // function hotspotCustom(hotSpotDiv, args) {
  //   let img = document.createElement("img");
  //   img.src = args.imageSrc;
  //   img.classList.add("hotspot-icon");  // Thêm class để kiểm soát bằng CSS
  //   hotSpotDiv.appendChild(img);
  // } 
 
    const video1 = ref(null)
    const video2 = ref(null)

    const playVideo = (videoRefName) => {
        const video = { video1, video2 }[videoRefName]?.value
        if (video) video.play()
    }

    const pauseVideo = (videoRefName) => {
        const video = { video1, video2 }[videoRefName]?.value
        if (video) video.pause()
    }
    // const toggleVR = () => {
    //     if (!viewer) {
    //     console.error("Viewer chưa được khởi tạo.");
    //     return;
    //   }

    //   if (viewer.isVrMode()) {
    //     viewer.exitVR(); // Nếu đã vào VR, thoát ra
    //   } else {
    //     viewer.enterVR(); // Nếu chưa vào VR, bật chế độ VR
    //   }
        // if (navigator.xr) {
        //     navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        //         if (supported) {
        //             if (viewer) {
        //                 if (viewer.isVRMode()) {
        //                     viewer.exitVR(); // Thoát khỏi chế độ VR
        //                 } else {
        //                     viewer.enterVR(); // Vào chế độ VR
        //                 }
        //             } else {
        //                 console.error("Viewer is not initialized.");
        //             }
        //         } else {
        //             console.log("Thiết bị không hỗ trợ VR");
        //         }
        //     });
        // } else {
        //     console.log("Trình duyệt không hỗ trợ WebXR");
        // }
    // };
    
  // Thêm hàm toggleVR
    // const toggleVR = () => {
    //     alert("Chế độ VR được bật tự động nếu thiết bị hỗ trợ. Nhấn nút VR trong viewer để kích hoạt.");
    // };
  </script>
  
<style scoped>
  .panorama-container {
    width: 100%;
    height: 500px;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
  
  }
    .hotspot-icon {
        width: 24px;  /* Chỉnh kích thước theo mong muốn */
        height: 24px;
    }
  /* .hotspot-icon {
    width: 2px;
    height: auto;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  .hotspot-icon:hover {
      transform: scale(1.2);
  } */
    .container {
        margin-top: 40px; /* Tạo khoảng cách trên cho từng container */
        margin-bottom: 40px; /* Tạo khoảng cách dưới cho từng container */
    }
    .text-center {
        margin-top: 50px; /* Giảm khoảng cách trên nếu cần */
        margin-bottom: 50px; /* Tăng khoảng cách dưới */
    }
    img {
        width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của phần tử cha */
        max-width: 1200px; /* Giới hạn kích thước tối đa */
        height:auto; /* Giữ nguyên tỷ lệ ảnh */
        display: block; /* Đảm bảo ảnh không bị lệch */
        margin-top: 100px;
    }
   /* Style cho nút AR */
    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
    }

    /* Responsive cho AR */
    @media (max-width: 768px) {
        .btn {
            margin: 5px;
            font-size: 14px;
        }
    }

    .video-wrapper {
        background-color: #000; /* Nền đen khi video chưa load */
        max-height: 360px;
        margin-bottom: 20px; /* Tạo khoảng cách dưới cho video */
    }

    video {
        display: block;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
    .realsee-container {
        width: 90%; /* Đặt độ rộng */
        max-width: 500px; /* Giới hạn độ rộng tối đa */
        height: 400px; /* Đặt chiều cao */
        margin: 20px auto; /* Tạo khoảng cách trên và dưới */
    }
    /* .custom-tooltip {
        position: absolute;
        bottom: 125%; /* hiển thị phía trên icon
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.85);
        color: #fff;
        padding: 10px 14px;
        border-radius: 8px;
        white-space: nowrap;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 100;
    } */

    /* Mũi tên phía dưới tooltip
    .custom-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent;
    } */

    /* Khi hover thì hiển thị tooltip */
    /* .hotspot-hover:hover .custom-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(-4px);
    } */

    /* Style cho icon hotspot */
    /* .hotspot-image {
        width: 36px;
        height: 36px;
        transition: transform 0.3s ease;
        /* transform-origin: center center; ← Thêm dòng này */
    /* } */

    /* Tăng hiệu ứng khi rê chuột vào icon */
    /* .hotspot-hover:hover .hotspot-image {
        transform: scale(1.2);
    } */
</style>
  
<!-- <link rel="stylesheet" href="https://cdn.rawgit.com/mpetroff/pannellum/master/build/pannellum.css" />
<script src="https://cdn.rawgit.com/mpetroff/pannellum/master/build/pannellum.js"></script>
   -->