<template>
    <div class="container">
      <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745221290/banner4_qnjosk.png" alt="banner">
      <!-- <h2 class="text-center mb-4">Thư viện 3D</h2> -->
      <section id="thuvien3D" class="my-5">
        <div class="row">
            <h2 class="text-center mb-4">Thư viện các model đình Bình Thủy Cần thơ</h2>
          
            <div class="col-md-7">
                <div class="history-content">
                    <p>Các cổ vật tại đình Bình Thủy không chỉ là những tác phẩm nghệ thuật quý giá mà còn mang trong mình những giá trị văn hóa sâu sắc. Chúng là minh chứng cho sự tôn trọng và gìn giữ các giá trị truyền thống của người dân miền Tây.</p>
                    <div class="history-milestone p-3 bg-light rounded my-4">
                        <h5>Các sản phẩm quan trọng:</h5>
                        <ul>
                          <li><strong>Bàn Thờ 3D:</strong> Mô phỏng thiết kế bàn thờ truyền thống, thể hiện sự trang nghiêm.</li>
                          <li><strong>Tượng Hình Voi 3D:</strong> Tượng voi chi tiết, biểu trưng cho sức mạnh trong văn hóa.</li>
                          <li><strong>Bàn Thờ Truyền Thống 3D:</strong> Khám phá họa tiết và hình ảnh trên bàn thờ cổ.</li>
                          <li><strong>Tượng Thần Tài 3D:</strong> Tượng Thần Tài thể hiện sự thịnh vượng và may mắn.</li>
                          <li><strong>Tượng Canh Gác Đình 3D:</strong> Tượng bảo vệ đình, mang ý nghĩa văn hóa sâu sắc.</li>
                          <li><strong>Khối Gỗ 3D:</strong> Khối gỗ lớn với nhiều chi tiết tinh xảo trong nghi lễ.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <img src="https://res.cloudinary.com/dku2deoem/image/upload/v1745220186/binhthuy2_ue3tvl.jpg" alt="Đình Bình Thủy xưa" class="img-fluid rounded mb-3">
                <p class="text-center fst-italic">Đình phải trải qua nhiều lần tu sửa, song vẫn giữ được nét trầm mặc (Ảnh: sưu tầm)</p>
            </div>
        </div>
    </section>
      <div class="row">
        <!-- Thanh nhập tìm kiếm -->
        <div class="col-md-12 mb-4 mt-4">
          <input type="text" v-model="search" placeholder="Tìm kiếm tên các model" class="form-control">
        </div>
        <!-- Danh sách sản phẩm -->
        <div class="col-md-4 mb-4 mt-4" v-for="model in filteredModels" :key="model.id">
          <div class="card model-card" @click="selectedModel = model">
            <div class="card-body">
              <h5 class="card-title">{{ model.name }}</h5>
              <iframe :src="model.url" allowfullscreen style="width: 100%; height: 200px;"></iframe>
            </div>
          </div>
        </div>
      </div>
  
      <!-- model hiển thị sản phẩm -->
      <div v-if="selectedModel" class="model-overlay">
        <div class="model-content">
          <button class="close-btn" @click="selectedModel = null">×</button>
          <iframe :src="selectedModel.url" allowfullscreen></iframe>
          <h3>{{ selectedModel.name }}</h3>
          <p>{{ selectedModel.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
export default {
  data() {
    return {
      search: '',
      models: [
        {
          id: 1,
          name: 'Bàn Thờ',
          description: 'Bàn thờ truyền thống với bộ đồ thờ bằng đồng gồm một lư hương lớn ở giữa và hai chân nến hai bên. Bàn thờ được phủ bằng khăn đỏ thêu hình rồng vàng và họa tiết trang trí ở giữa, thể hiện nét văn hóa đặc trưng trong tín ngưỡng thờ cúng của người Việt.',
          url: 'https://sketchfab.com/models/b10237534ba14feda1090c791b7adf27/embed',
          views: 37,
          comments: 0,
          likes: 1
        },
        {
          id: 2,
          name: 'TƯỢNG HÌNH VOI',
          description: 'Tượng hình voi được thiết kế như một chiếc ghế hoặc bệ đỡ trang trí. Tượng có màu nâu với các chi tiết hoa văn màu xanh và trắng, phía trên có mặt phẳng có thể dùng để đặt vật dụng. Bức tượng được làm bằng gốm hoặc sứ và đặt trên nền gạch.',
          url: 'https://sketchfab.com/models/5b572182004344ec99978c2c3c7233f3/embed',
          views: 22,
          comments: 0,
          likes: 0
        },
        {
          id: 3,
          name: 'BÀN THỜ TRUYỀN THỐNG',
          description: 'Bàn thờ truyền thống được bài trí công phu. Ở giữa là một lư hương lớn bằng đồng, hai bên là các tượng linh vật hoặc thần hộ mệnh đặt trên bệ có chạm trổ. Phía sau có hai cây đèn hoặc nến lớn, trang trí cao vút. Bên dưới bàn là các bình gốm và vật dụng thờ cúng khác. Bàn thờ được trang trí bằng hoa và các chi tiết thủ công mang đậm nét văn hóa tâm linh Á Đông.',
          url: 'https://sketchfab.com/models/70f79b24138347ffb7e269984e0f9e91/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 4,
          name: 'TƯỢNG THẦN TÀI',
          description: 'Đây là tượng Thần Tài – một vị thần trong tín ngưỡng dân gian Á Đông, đặc biệt phổ biến ở Việt Nam và Trung Quốc. Tượng được trang trí với màu sắc rực rỡ, mặc trang phục cổ truyền, đầu đội mũ quan, tay cầm gậy như ý và thỏi vàng, biểu tượng cho sự thịnh vượng và phát tài. Tượng thường được đặt trong nhà, cửa hàng hoặc trên bàn thờ để cầu mong may mắn và tài lộc.',
          url: 'https://sketchfab.com/models/b14563dd45b6403584e2421ab402fec2/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 5,
          name: 'TƯỢNG CANH GÁC ĐÌNH',
          description: 'Đây là tượng một vị tướng hoặc thần hộ pháp trong tín ngưỡng dân gian. Tượng được tô vẽ rực rỡ, mặc áo giáp với họa tiết trang nghiêm, đầu đội mũ chiến binh, tay cầm rìu ở cả hai bên – biểu tượng cho sức mạnh và sự bảo vệ. Gương mặt dữ dằn, râu rậm và dáng đứng uy nghi thể hiện rõ hình ảnh của một vị thần canh giữ hoặc trấn giữ, thường được đặt tại đình, đền, miếu hoặc trước bàn thờ để xua đuổi tà ma và bảo vệ bình an.',
          url: 'https://sketchfab.com/models/8da06933c87f495f9203cdec2554f37e/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 6,
          name: 'KHỐI GỖ',
          description: ' Chất liệu tượng là gỗ được chạm khắc công phu, mang phong cách nghệ thuật truyền thống, có thể bắt nguồn từ một truyền thuyết dân gian hoặc tác phẩm điêu khắc nghệ thuật tâm linh.',
          url: 'https://sketchfab.com/models/5d81737d5ec149e3b5d36c8abbc7dc88/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 7,
          name: 'KHỐI GỖ',
          description: 'Cấu trúc tượng có thể mang tính biểu tượng liên quan đến tín ngưỡng phồn thực hoặc nghi lễ dân gian cổ xưa, thường thấy trong văn hóa Đông Nam Á, đặc biệt là trong các lễ hội cầu mùa hoặc tôn vinh sinh khí. Bệ tượng được đặt trên nền hình tròn như một mâm lễ.',
          url: 'https://sketchfab.com/models/59e4b9074539416783aa079bd7550e08/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 8,
          name: 'BÌNH XANH',
          description: 'Đây là một chiếc bình gốm có thân hình bầu, được tráng men xanh ngọc với hoa văn nổi tinh xảo bao quanh thân. Đế bình to, chắc chắn, giúp bình đứng vững. Toàn bộ bề mặt được phủ lớp men bóng, tạo cảm giác cổ kính và sang trọng, gợi nhớ đến phong cách gốm truyền thống Việt Nam hoặc Trung Hoa.',
          url: 'https://sketchfab.com/models/a8d2f000f85b4224ba8d801d47e5d00f/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 9,
          name: 'BIA ĐÁ',
          description: 'Bia đá đình Bình Thủy (Cần Thơ) có hình vuông, đặt trên bệ hoa sen, được chạm khắc tinh xảo. Trên bia ghi lại công đức và lịch sử của đình, thể hiện giá trị văn hóa, tín ngưỡng lâu đời của vùng đất Tây Nam Bộ.',
          url: 'https://sketchfab.com/models/e58094d8ec824a988712b90b944d4de9/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 10,
          name: 'CỔ VẬT',
          description: 'Tượng thú linh mang hình dáng sư tử, được sơn màu đen chủ đạo, điểm các chi tiết vàng và đỏ nổi bật. Tác phẩm thể hiện phong cách nghệ thuật truyền thống, thường thấy trong văn hóa tâm linh Đông Nam Á. Tư thế đứng uy nghi thể hiện sự dũng mãnh và bảo hộ.',
          url: 'https://sketchfab.com/models/3170d21a2ec14f7c99816d936932194f/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 11,
          name: 'CÁ CHÉP GỖ',
          description: 'Tượng cá chép gỗ được chạm khắc công phu, thể hiện hình ảnh cá chép mạnh mẽ vươn lên giữa làn sóng cuộn trào. Với màu gỗ nâu trầm bóng loáng, thân cá phủ đầy vảy sắc nét, tượng trưng cho sự bền bỉ và kiên cường. Cá chép là linh vật phong thủy tượng trưng cho may mắn, tài lộc và công danh, thường được trưng trong nhà hoặc văn phòng như một lời chúc thăng tiến, vượt khó hóa rồng.',
          url: 'https://sketchfab.com/models/4db2286a59944686a7f63e85471cee88/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 12,
          name: 'CỔ VẬT KỲ LÂN',
          description: 'Tượng Kỳ Lân với hình dáng oai phong: thân hình uyển chuyển như sư tử, đầu lớn, miệng há rộng nở nụ cười, cùng đôi mắt to tròn đầy thần thái. Đuôi uốn cong cao vút, tạo thành hình ngọn lửa, biểu trưng cho khí thiêng. Từng đường nét trên thân Kỳ Lân được chạm khắc tinh xảo, mang đậm chất nghệ thuật dân gian. Kỳ Lân là linh vật biểu trưng cho điềm lành, trí tuệ và sự bảo hộ, thường đặt tại các đền đài, miếu mạo hoặc lăng tẩm để trấn trạch và thu hút cát khí.',
          url: 'https://sketchfab.com/models/9de18294aeb948d9ab384a6ce577cc24/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 13,
          name: 'TRỐNG ĐỒNG',
          description: 'Chiếc trống đồng được chế tác tinh xảo với mặt trống chạm khắc các hoa văn hình học, hình chim Lạc bay và cảnh sinh hoạt cổ. Thân trống hình nấm, chia thành nhiều tầng rõ rệt. Trống đồng không chỉ là nhạc cụ cổ, mà còn là biểu tượng của quyền lực và tín ngưỡng người Việt cổ, thường dùng trong các nghi lễ quan trọng như lễ hội, cầu mưa, hoặc các nghi thức tôn giáo.',
          url: 'https://sketchfab.com/models/940d314a64c1488093869751d8add38c/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 14,
          name: 'TƯỢNG CHIM GỖ',
          description: 'Tác phẩm điêu khắc thể hiện hình ảnh một con đại bàng oai phong đang vươn mình bay lên giữa làn mây hoặc sóng cuộn. Với màu sắc chuyển dần từ nâu trầm sang đỏ cam rực rỡ, tượng mang đậm chất phong thủy, thể hiện khát vọng vươn cao, quyền lực và sự kiên cường. Đây là một vật phẩm trang trí mang ý nghĩa may mắn, thường được trưng bày trong phòng khách hoặc phòng làm việc.',
          url: 'https://sketchfab.com/models/9f891125f59146b2b5f0a21a61b7cc2d/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 15,
          name: 'TƯỢNG GỖ',
          description: ' Chất liệu tượng là gỗ được chạm khắc công phu, mang phong cách nghệ thuật truyền thống, có thể bắt nguồn từ một truyền thuyết dân gian hoặc tác phẩm điêu khắc nghệ thuật tâm linh.',
          url: 'https://sketchfab.com/models/f26410a0ae8a42f09f5316be81089762/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 16,
          name: 'BÀN THỜ CÚNG',
          description: 'Bàn thờ truyền thống được phủ khăn đỏ có họa tiết rồng vàng, tượng trưng cho sự linh thiêng và trang trọng. Trên bàn đặt một lư hương lớn bằng đồng, xung quanh là các chân nến, lọ hoa sen và mâm lễ vật gồm trái cây, bánh mứt… thể hiện lòng thành kính dâng lên tổ tiên hoặc thần linh. Không gian thờ cúng này mang đậm nét văn hóa tâm linh của người Việt, vừa trang nghiêm vừa ấm cúng.',
          url: 'https://sketchfab.com/models/d08ba4fb04b2402ca7daeeeb0d04200b/embed',
          views: 24,
          comments: 0,
          likes: 0
        },
        {
          id: 16,
          name: 'TRẠM KHÁC BÊN NGOÀI ĐÌNH',
          description: 'Đây là một phần bức bình phong gốm được trang trí công phu với hình ảnh chim phượng, hoa lá và họa tiết truyền thống. Nền chính được tô viền đỏ, hai bên có cột trụ màu vàng tạo cảm giác đối xứng. Mảng gốm chính ở giữa mô tả một cảnh sinh động, mang đậm tính biểu tượng và mỹ thuật dân gian.',
          url: 'https://sketchfab.com/models/5f87ed8f5d9648a0b1f8ee40508450df/embed',
          views: 24,
          comments: 0,
          likes: 0
        }
       
        
      ],
      selectedModel: null
    };
  },
  computed: {
    filteredModels() {
      return this.models.filter(model => 
        model.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
        selectModel(model) {
            this.selectedModel = model;
        }
    }
};
</script>


  
<style scoped>
    .container {
        max-width: 1200px;
        margin-top: 100px;
    }

    .card {
        transition: transform 0.3s ease;
        cursor: pointer;
        margin-bottom: 20px;
    }   
    .card:hover {
        transform: translateY(-5px);
    }
  
  .model-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: gray;
  }
  
  .model-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .model-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    position: relative;
    text-align: center;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }
  
  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

    .model-card {
    cursor: pointer;
    transition: transform 0.3s;
    }
    .model-card:hover {
    transform: scale(1.05);
    }
    .model-display iframe {
    width: 100%;
    height: 400px;
    border: none;
    }
    img {
        width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của phần tử cha */
        max-width: 1200px; /* Giới hạn kích thước tối đa */
        height:auto; /* Giữ nguyên tỷ lệ ảnh */
        display: block; /* Đảm bảo ảnh không bị lệch */
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
</style>