// Khởi tạo ảnh 360 độ bằng Pannellum
const viewer = pannellum.viewer('panorama', {
    default: {
        firstScene: "scene1",
        autoLoad: true,
        autoRotate: 0, // Ban đầu không xoay
        type: 'equirectangular',
        yaw: 0, // Bắt đầu từ giữa hình
        minYaw: -360, // Không giới hạn góc xoay
        maxYaw: 360,
        minPitch: -90, // Giữ nguyên tầm nhìn dọc
        maxPitch: 90,
        "hotSpotDebug": true // toa do
    },

    scenes: {
        "scene1": {// san_1
            type: "equirectangular",
            panorama: "pannellum/image/image_360/san_1.jpg",
            hotSpots: [
                {
                    pitch: -5.288059047660797, yaw: 4.822458376531989,
                    type: "custom",
                    cssClass: "custom-hotspot",
                    createTooltipFunc: hotspotCustom,
                    createTooltipArgs: {
                        imageSrc: "pannellum/image/Arrow_Top.png"
                    },
                    clickHandlerFunc: function() {
                        viewer.loadScene("scene2");
                    }
                },
                {
                    pitch: 10,
                    yaw: 20,
                    type: "custom",
                    cssClass: "custom-hotspot",
                    createTooltipFunc: hotspotCustom,
                    createTooltipArgs: {
                        imageSrc: "pannellum/image/infor2.png"
                    },
                    text: "Xem mô hình 3D",
                    clickHandlerFunc: function() {
                        // Sử dụng Bootstrap 5 Modal
                        var myModal = new bootstrap.Modal(document.getElementById('productModal'));
                        myModal.show();
                    }
                }
            ]
        },
        "scene2": { //san_2
            type: "equirectangular",
            panorama: "pannellum/image/image_360/san_2.jpg", // Fixed path
            hotSpots: [
            {
                //tro ve san 1
                pitch: -7.515813447458353,
                yaw: 0.7776918234160708,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            }
            ]
        },
        "scene3": { //san_3
            type: "equirectangular",
            panorama: "pannellum/image/image_360/san_3.jpg", // Fixed path
            hotSpots: [
            {
                // di den san 2
                pitch: -6.22776769360131, yaw: 153.79065378215358,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene5");
                }
            }
            ]
        },
        "scene4": { //san_4
            type: "equirectangular",
            panorama: "pannellum/image/image_360/san_4.jpg", // Fixed path
            hotSpots: [
            {
                // di den san 3
                pitch: -5.746508884971536, yaw: 19.968273210657483,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene3");
                }
            },
            {
                //di den san 4
                pitch: -9.681505472456209, yaw: -154.24556022674798,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene3");
                }
            }
            ]
        },
        "scene5": { //Dinh_1
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_1.jpg", // Fixed path
            hotSpots: [
            //Pitch: -30.91344817148359, Yaw: 172.5966473201301
            {
                //di den san 2
                pitch: -30.91344817148359, yaw: 172.5966473201301,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene8");
                }
            },
            ]
        },
        "scene6": { //Dinh_2
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_2.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 1
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene7");
                }
            }
            ]
        },
        "scene7": { //Dinh_3
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_3.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 2
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene10");
                }
            }
            
            ]
        },
        "scene8": { //Dinh_4
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_4.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 1
                pitch: -42.62921650656654, yaw: -177.8040351923422,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene11");
                }
            }
            ]
        },
        "scene9": { //Dinh_5
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_5.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 4
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene10");
                }
            }
            ]
        },
        "scene10": { //Dinh_6
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_6.jpg", // Fixed path
            hotSpots: [
            
            {
                //di den dinh 3
                pitch: -40.104152027957454, yaw: -179.91276079006443,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            }
            ]
        },
        "scene11": { //Dinh_7
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_7.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 4
                pitch: -40.27202817936073, yaw: 179.7363251411303,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene8");
                }
            },
            {
                //di den dinh 8
                pitch: -26.614305868415364, yaw: -82.0746514150161,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene14");
                }
            }
            ]
        },
        "scene12": { //Dinh_8
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_8.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 7
                pitch: -20.259799402291986, yaw: -63.96019342819967,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            }
            ]
        },
        "scene13": { //Dinh_9
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_9.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 6
                pitch: -34.698916454488625, yaw: -173.30245362917935,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene16");
                }
            }
            ]
        },
        "scene14": { //Dinh_10
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_10.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 7
                pitch: -16.89757449897152, yaw: -176.3081662451436,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene17");
                }
            }
            ]
        },
        "scene15": { //Dinh_11
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_11.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 10
                pitch: -22.281426584293904, yaw: -85.0584341996688,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene14");
                }
            },
            {
                //di den dinh 12
                pitch: -20.530369525357717, yaw: 90.63949709103541,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene16");
                }
            }
            ]
        },
        "scene16": { //Dinh_12
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_12.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 9
                pitch: -17.115222405914785, yaw: -177.01629104276128,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene13");
                }
            },
            {
                //di den dinh 11
                pitch: -22.482306696701485, yaw: 91.58203987967325,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene19");
                }
            }
            ]
        },
        "scene17": { //Dinh_13
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_13.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 10
                pitch: -12.072900196201434, yaw: 173.8013828724154,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene20");
                }
            }
            ]
        },
        "scene18": { //Dinh_14
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_14.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 13
                pitch: -20.415441502246313, yaw: 83.46327094810016,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene19");
                }
            }
            ]
        },
        "scene19": { //Dinh_15
            type: "equirectangular",
            panorama: "pannellum/image/image_360/15_1.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 12
                pitch: -19.02268882331726, yaw: -174.59461778795009,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene22");
                }
            }
            ]
        },
        "scene20": { //Dinh_16
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_16.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 13
                pitch: -14.788819490429315, yaw: -178.025907234413,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene21");
                }
            }
            ]
        },
        "scene21": { //Dinh_17
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_17.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 16
                pitch: -20.52665969151568, yaw: 101.85366596119269,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene22");
                }
            }
            ]
        },
        "scene22": { //Dinh_18
            type: "equirectangular",
            panorama: "pannellum/image/image_360/Dinh_18.jpg", // Fixed path
            hotSpots: [
            {
                // di den dinh 15
                pitch: -11.504141274542402, yaw: -178.3106506773007,
                type: "custom",
                cssClass: "custom-hotspot",
                createTooltipFunc: hotspotCustom,
                createTooltipArgs: {
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
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
                    imageSrc: "pannellum/image/Arrow_Top.png" // Fixed path
                },
                clickHandlerFunc: function() {
                    viewer.loadScene("scene21");
                }
            }
            ]
        }
    }
});



function hotspotCustom(hotSpotDiv, args) {
    let img = document.createElement("img");
    img.src = args.imageSrc;
    img.classList.add("hotspot-icon");
    hotSpotDiv.appendChild(img);
}

let autoRotate = true;
let yaw = viewer.getYaw(); // Lấy giá trị góc hiện tại
let rotateSpeed = 0.5; // Giảm tốc độ xoay để mượt hơn
let isUserInteracting = false;
let animationFrameId;

// Khi người dùng kéo chuột => Dừng xoay
// viewer.on('mousedown', function () {
//     autoRotate = false;
//     isUserInteracting = true;
//     cancelAnimationFrame(animationFrameId);
// });

// Khi người dùng di chuột => Dừng xoay
viewer.on('mousemove', function () {
    if (!isUserInteracting) {
        autoRotate = false;
        isUserInteracting = true;
        cancelAnimationFrame(animationFrameId);
    }
});

// Khi người dùng thả chuột => Chờ 3 giây rồi xoay lại
viewer.on('mouseup', function () {
    setTimeout(() => {
        isUserInteracting = false;
        autoRotate = true;
        rotate360();
    }, 3000);
});

// ✅ Hàm xoay ảnh tự động (xoay vô hạn không reset góc)
function rotate360() {
    if (autoRotate && !isUserInteracting) {
        yaw += rotateSpeed; // Tăng dần góc yaw
        if (yaw > 360) {
            yaw -= 360; // Đảm bảo yaw không vượt quá 360 độ
        }
        viewer.setYaw(yaw); // Cập nhật góc mới
        animationFrameId = requestAnimationFrame(rotate360); // Lặp lại hàm liên tục
    }
}

// ⭐ Bắt đầu xoay ngay khi trang tải
rotate360();

// ✅ Thêm nút bật/tắt xoay tự động
document.getElementById('toggleRotate').addEventListener('click', function () {
    autoRotate = !autoRotate; // Đảo trạng thái xoay tự động
    if (autoRotate) {
        rotate360(); // Bắt đầu xoay nếu được bật
    } else {
        cancelAnimationFrame(animationFrameId); // Dừng xoay nếu bị tắt
    }
});

// ✅ Thêm nút đảo chiều xoay
document.getElementById('reverseRotate').addEventListener('click', function () {
    rotateSpeed = -rotateSpeed; // Đảo chiều xoay
});
function loadScene(sceneId) {
    viewer.loadScene(sceneId);
}

// Thêm event listener để kiểm tra
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem modal có tồn tại không
    const productModal = document.getElementById('productModal');
    if (productModal) {
        console.log('Modal element found');
        
        // Test mở modal
        const testButton = document.createElement('button');
        testButton.innerHTML = 'Test Modal';
        testButton.onclick = function() {
            var modal = new bootstrap.Modal(productModal);
            modal.show();
        };
        document.body.appendChild(testButton);
    } else {
        console.error('Modal element not found');
    }
});

