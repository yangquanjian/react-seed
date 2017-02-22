;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-wo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M521.424138 91.275843c-238.699474 0-432.193373 193.46013-432.193373 432.193373 0 238.669798 193.493899 432.193373 432.193373 432.193373 238.70152 0 432.193373-193.522552 432.193373-432.193373C953.616488 284.735973 760.124635 91.275843 521.424138 91.275843zM804.83186 805.938566c-36.656875-83.381036-109.390409-147.099243-198.603267-171.298388 54.397934-29.951149 91.273796-87.787392 91.273796-154.286945 0-97.262184-78.831416-176.078251-176.078251-176.078251-97.244788 0-176.078251 78.816067-176.078251 176.078251 0 68.000743 38.626739 126.901225 95.105055 156.229181-88.571245 26.260084-160.149467 91.726098-194.836477 176.360683C169.142793 740.065276 121.2449 637.456317 121.2449 523.468193c0-221.035162 179.160449-400.178215 400.178215-400.178215 221.020836 0 400.178215 179.143053 400.178215 400.178215C921.602354 633.736599 876.973924 733.562165 804.83186 805.938566z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wode" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 39.358216c-260.927454 0-472.450321 211.522867-472.450321 472.453934S251.072546 984.262471 512 984.262471s472.450321-211.522867 472.450321-472.450321S772.927454 39.358216 512 39.358216zM512 941.429027c-237.269174 0-429.613265-192.344091-429.613265-429.613265 0-237.272786 192.344091-429.616877 429.613265-429.616877s429.62049 192.344091 429.62049 429.616877C941.62049 749.081324 749.269174 941.429027 512 941.429027z"  ></path>' +
    '' +
    '<path d="M792.39523 862.470557c-0.090313-0.924801-0.191463-1.845989-0.292613-2.767177-0.0289-1.997714-0.2601-3.937628-0.67915-5.816129-13.098935-102.988838-80.414309-189.045876-172.450039-228.64613 53.183264-36.439314 88.087265-97.613434 88.087265-166.944585 0-111.694969-90.554604-202.242348-202.235123-202.242348-111.694969 0-202.245961 90.547379-202.245961 202.242348 0 69.356438 34.929288 130.555846 88.141452 166.984322-91.027842 39.210104-157.862753 123.883553-171.929838 225.416553-1.029563 2.962252-1.593114 6.134029-1.593114 9.446694l0.209525 2.207239c0 0.039738-0.003613 0.075863-0.007225 0.1156l0.021675 0 0.032513 0.3468c0 15.927524 12.911084 28.834996 28.831384 28.834996 15.927524 0 28.834996-12.907472 28.834996-28.834996l-0.0289-0.3468 0.523813 0c13.43851-110.127143 104.394101-196.310619 216.638171-202.339886 4.157991 0.256488 8.352106 0.397375 12.575122 0.397375 4.226628 0 8.420744-0.140888 12.578734-0.400988 112.27297 6.025654 203.239399 92.205518 216.670684 202.343498l0.585225 0 0.032513 0.3468c0 15.927524 12.914697 28.834996 28.834996 28.834996s28.834996-12.907472 28.834996-28.834996l-0.032513-0.3468L792.39523 862.466944 792.39523 862.470557zM504.771382 602.807479c-79.778508 0-144.449531-64.674635-144.449531-144.449531 0-79.778508 64.66741-144.456756 144.449531-144.456756s144.449531 64.678247 144.449531 144.456756C649.220913 538.132844 584.549891 602.807479 504.771382 602.807479L504.771382 602.807479zM504.771382 602.807479"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jinbi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.366062 954.24838c-183.947476 0-333.059562-74.599022-333.059562-166.615739l0 0 0-93.713358c0 92.016717 149.112086 149.257395 333.059562 149.257395 183.91473 0 333.028862-57.241702 333.028862-149.257395l0 93.713358 0 0C844.394924 879.648334 695.279768 954.24838 511.366062 954.24838L511.366062 954.24838zM511.366062 787.632641c-183.947476 0-333.059562-74.586742-333.059562-166.603459l0-93.717452c0 92.012623 149.112086 149.249209 333.059562 149.249209 183.91473 0 333.028862-57.236586 333.028862-149.249209l0 93.717452C844.394924 713.045899 695.279768 787.632641 511.366062 787.632641L511.366062 787.632641zM511.366062 621.029182c-183.947476 0-333.059562-74.590835-333.059562-166.611645l0-93.715405c0 92.010577 149.112086 149.251256 333.059562 149.251256 183.91473 0 333.028862-57.241702 333.028862-149.251256l0 93.715405C844.394924 546.438347 695.279768 621.029182 511.366062 621.029182L511.366062 621.029182zM511.366062 454.417537c-183.947476 0-333.059562-74.596975-333.059562-166.614715l0-55.526641c0-92.021833 149.112086-166.617785 333.059562-166.617785 183.91473 0 333.028862 74.595952 333.028862 166.617785l0 55.526641C844.394924 379.820562 695.279768 454.417537 511.366062 454.417537L511.366062 454.417537z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dianhua" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.963954 967.990359c-61.836347 0-121.827673-12.112875-178.310082-36.002982-54.549384-23.072485-103.538121-56.099692-145.604192-98.166787-42.066071-42.066071-75.094302-91.053786-98.166787-145.604192-23.889083-56.480362-36.002982-116.472712-36.002982-178.310082 0-61.836347 12.112875-121.827673 36.002982-178.310082 23.072485-54.549384 56.100716-103.538121 98.166787-145.604192 42.066071-42.066071 91.053786-75.094302 145.604192-98.166787 56.481386-23.889083 116.473735-36.002982 178.310082-36.002982s121.828696 12.112875 178.310082 36.002982c54.549384 23.072485 103.538121 56.100716 145.604192 98.166787 42.065048 42.066071 75.094302 91.053786 98.166787 145.604192 23.890107 56.481386 36.002982 116.473735 36.002982 178.310082 0 61.836347-12.112875 121.828696-36.002982 178.310082-23.072485 54.550407-56.100716 103.538121-98.166787 145.604192-42.066071 42.066071-91.054809 75.094302-145.604192 98.166787C634.792651 955.877483 574.800301 967.990359 512.963954 967.990359zM512.963954 72.290443c-59.08263 0-116.39187 11.5695-170.337503 34.386158-52.109822 22.040992-98.911754 53.595662-139.105175 93.789083s-71.748091 86.995353-93.789083 139.105175c-22.816658 53.94461-34.386158 111.254873-34.386158 170.337503s11.5695 116.39187 34.386158 170.33648c22.040992 52.109822 53.595662 98.911754 93.789083 139.105175 40.193421 40.193421 86.995353 71.748091 139.105175 93.789083 53.94461 22.816658 111.254873 34.386158 170.337503 34.386158 59.08263 0 116.39187-11.5695 170.337503-34.386158 52.109822-22.040992 98.911754-53.595662 139.105175-93.789083 40.193421-40.192398 71.748091-86.995353 93.789083-139.105175 22.816658-53.945633 34.386158-111.254873 34.386158-170.33648s-11.5695-116.39187-34.386158-170.337503c-22.040992-52.109822-53.595662-98.911754-93.789083-139.105175-40.192398-40.193421-86.995353-71.748091-139.105175-93.789083C629.355825 83.85892 572.046584 72.290443 512.963954 72.290443z"  ></path>' +
    '' +
    '<path d="M461.546911 561.324382c17.706267 17.767666 42.577724 33.463136 42.577724 33.463136s31.390941 23.194258 54.494125 9.142218c49.495274-30.323633 48.307216-40.86778 72.566736-27.213805 84.757382 47.452755 81.222883 78.93477 79.118965 86.678128-8.473999 30.477129-63.911612 55.194066-124.407428 40.045041-60.802808-15.116279-121.66599-47.209208-170.644495-95.820346-48.581462-48.946782-80.672344-109.779266-95.821369-170.642448-15.086603-60.497862 9.570983-115.906823 40.077787-124.407428 7.773034-2.165316 39.255049-5.638417 86.707804 78.995145 13.563924 24.382317 3.139503 23.223934-27.184129 72.689532-14.202467 23.101137 9.020444 54.494125 9.020444 54.494125S443.901019 543.585369 461.546911 561.324382L461.546911 561.324382zM461.546911 561.324382"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfont-addcustmor" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M755.406 626.961c-29.257-22.254-61.555-40.708-96.23-54.49 71.582-50.563 118.33-133.825 118.33-228.129 0-154.245-125.032-279.215-279.27-279.215-154.235 0-279.266 125.063-279.266 279.305 0 97.588 50.068 183.243 125.909 233.178-141.675 61.796-241.556 204.086-245.468 364.795h514.957c-19.865-31.942-31.37-69.622-31.37-110.002 0-102.864 74.461-188.281 172.409-205.442z"  ></path>' +
    '' +
    '<path d="M826.29 802.658v-97.823h-55.898v97.823h-97.823v48.911h97.823v104.811h55.898v-104.811h97.823v-48.911h-97.823z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-passenger" viewBox="0 0 1176 1024">' +
    '' +
    '<path d="M586.873064 1021.886424C429.747074 1021.886424 272.616039 1021.896512 115.490049 1021.881379 59.255803 1021.876335 14.78999 984.699586 5.08469 929.33801 3.874049 922.43736 3.788296 915.274404 3.788296 908.237557 3.727764 667.622778 3.707586 427.008 3.75803 186.393222 3.768118 130.754207 37.590384 86.263172 90.424749 76.139192 111.409182 72.118857 133.644611 72.729222 155.1587 73.934818 174.397793 75.014305 187.351645 93.511882 185.873655 113.144433 184.511685 131.167842 169.11133 145.544197 150.427113 145.917478 138.57797 146.154562 126.718739 145.872079 114.864552 146.018365 92.154956 146.295803 76.784867 161.514562 76.779823 184.087961 76.729379 426.468256 76.729379 668.848552 76.784867 911.228847 76.789911 933.060729 91.816985 948.193734 113.674089 948.965517 115.691823 949.036138 117.709557 948.990739 119.727291 948.990739 431.719409 948.990739 743.711527 948.985695 1055.698601 949.026049 1065.186995 949.026049 1074.322286 948.133202 1082.378089 942.483547 1092.083389 935.673695 1097.2387 926.276099 1098.247567 914.553064 1098.464473 912.04603 1098.33332 909.513773 1098.33332 906.991606 1098.338365 667.385695 1098.338365 427.779783 1098.33332 188.173872 1098.33332 160.107192 1084.138562 146.01332 1055.870108 145.993143 1045.529222 145.988099 1035.183291 146.139429 1024.847448 145.932611 1005.936236 145.554286 990.6973 131.556256 989.214266 113.452138 987.584946 93.557281 1000.034365 75.43803 1019.505498 73.985261 1043.017143 72.229833 1066.927291 70.645911 1090.206897 76.956374 1138.995704 90.182621 1171.148296 132.918227 1171.158384 184.577261 1171.208828 375.253123 1171.178562 565.928985 1171.178562 756.604847 1171.178562 807.552631 1171.213872 858.500414 1171.168473 909.448197 1171.112985 974.424276 1123.433931 1021.891468 1058.266167 1021.891468 901.135133 1021.886424 744.004099 1021.886424 586.873064 1021.886424L586.873064 1021.886424Z"  ></path>' +
    '' +
    '<path d="M511.889025 574.741438C583.165478 618.415291 621.194719 681.429123 624.226365 765.911645L551.623251 765.911645C549.630739 676.137616 475.806897 623.373872 414.316453 620.831527 372.382897 619.096276 335.740847 631.550739 305.146956 660.237872 274.810325 688.687921 260.035468 724.437123 258.860138 766.062975L185.782857 766.062975C188.854857 681.953734 226.450286 618.793616 298.342148 574.660729 265.261399 536.813084 252.17135 493.083744 262.587901 443.366778 270.023251 407.895015 288.848709 379.288591 317.803192 357.602995 375.591094 314.322601 455.427783 319.987389 507.434877 370.526581 559.754719 421.343212 569.268335 512.232039 511.889025 574.741438L511.889025 574.741438ZM404.585931 547.00264C439.406975 549.262502 477.794365 519.107468 477.950739 474.762719 478.09198 434.433261 445.394601 401.609773 405.110542 401.554286 364.781084 401.498798 332.134148 434.21131 332.189635 474.621478 332.240079 514.935803 364.211074 546.896709 404.585931 547.00264L404.585931 547.00264Z"  ></path>' +
    '' +
    '<path d="M587.634759 145.97801C538.724887 145.967921 489.815015 146.083941 440.905143 145.907389 423.592985 145.846857 409.468847 133.917005 405.786483 117.119369 402.210049 100.795901 410.780374 83.312236 426.392591 76.61336 431.336039 74.494739 437.086581 73.314365 442.473931 73.304276 539.032591 73.112591 635.591251 73.127724 732.149911 73.188256 753.437005 73.203389 769.74534 88.946759 769.921892 109.26534 770.103488 130.01269 753.901084 145.902345 732.094424 145.952788 683.941202 146.058719 635.78798 145.983054 587.634759 145.97801L587.634759 145.97801Z"  ></path>' +
    '' +
    '<path d="M824.834522 510.870069C782.507507 510.870069 740.175448 511.061754 697.848433 510.799448 671.491783 510.632985 654.194759 486.707704 662.512867 462.615961 667.511803 448.138719 680.712828 438.100493 696.35531 438.070227 781.771034 437.913852 867.186759 437.883586 952.597438 438.070227 972.845399 438.115626 988.563547 454.227232 988.871251 474.127133 989.178956 494.112788 973.309478 510.602719 952.577261 510.749005 909.99803 511.051665 867.413754 510.839803 824.834522 510.839803L824.834522 510.870069 824.834522 510.870069Z"  ></path>' +
    '' +
    '<path d="M861.612768 693.560749C892.347901 693.560749 923.088079 693.313576 953.823212 693.656591 971.226167 693.848276 985.431015 706.857616 988.240709 724.023488 991.050404 741.18936 981.662897 757.961773 965.374739 763.828335 960.754128 765.492966 955.558463 766.244571 950.620059 766.259704 890.910266 766.421123 831.200473 766.421123 771.49068 766.330325 749.497379 766.295015 733.537103 750.758463 733.567369 729.84465 733.60268 708.986325 749.593222 693.611192 771.672276 693.530483 801.650759 693.419507 831.634286 693.500217 861.612768 693.500217L861.612768 693.560749 861.612768 693.560749Z"  ></path>' +
    '' +
    '<path d="M258.915626 109.482246C258.92067 85.783961 258.65332 62.085675 258.996335 38.392433 259.334305 15.087606 275.587153-0.539744 297.777182 0.373281 314.241892 1.054266 328.603113 13.700414 331.276611 30.023882 331.801222 33.242167 332.083704 36.536118 332.083704 39.799803 332.134148 86.43468 332.199724 133.074601 332.083704 179.709478 332.023172 203.861754 315.513064 220.200355 292.964887 218.823251 276.263094 217.804296 261.795941 205.480985 259.990069 188.809458 258.557478 175.5933 259.082089 162.150148 258.940847 148.807882 258.799606 135.7027 258.905537 122.592473 258.915626 109.482246L258.915626 109.482246Z"  ></path>' +
    '' +
    '<path d="M915.627507 109.462069C915.627507 134.668611 916.076453 159.890286 915.471133 185.081695 915.057498 202.292966 901.452926 216.417103 884.998305 218.540768 866.858877 220.88134 850.696828 211.347547 845.092571 194.570089 843.680158 190.34798 842.90333 185.707192 842.888197 181.253044 842.731823 133.6093 842.71669 85.960512 842.822621 38.316768 842.873064 16.404177 858.545813 0.317793 879.399094 0.332926 900.146443 0.348059 915.496355 15.8493 915.72335 37.610562 915.975567 61.55602 915.778837 85.506522 915.778837 109.457025 915.733438 109.462069 915.677951 109.462069 915.627507 109.462069L915.627507 109.462069Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tubiaozongjie11" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M293.977485 89.511807c18.341931 13.080902 38.260577 30.217734 53.587105 52.652755 15.416778 22.381933 43.90384 51.362715 43.90384 51.362715L623.420859 193.527278c0 0 24.500148-25.179675 39.423206-45.108939 14.721324-19.865559 27.319125-38.818002 55.153204-56.613126 23.279122-14.668236 35.282336-51.362715 5.483998-63.153577-25.954761-10.235381-36.487436 10.888365-66.482199 11.44579-29.591294 0.499028-33.721547-24.425824-62.946533-35.340733-29.294001-11.137879-45.01869-1.359055-62.511211 15.326528-17.338566 16.78645-23.985193 17.58808-23.985193 17.58808s-20.667189-12.098773-32.112978-24.84522c-11.291834-12.804844-40.883128-17.439433-60.281512-5.29819-24.648794 15.708762-30.047852 27.627036-50.555776 31.911243C341.310815 44.222369 304.51016 15.947658 284.145573 32.50583 263.887163 49.016222 275.725804 76.1867 293.977485 89.511807L293.977485 89.511807zM767.99562 396.010514c-86.353067-72.481152-132.773282-141.341697-132.773282-141.341697L382.390369 254.668816c0 0-48.442871 72.082992-125.919611 139.223483C167.611934 471.114217 95.576722 594.70857 122.694112 742.797762c24.096678 131.759299 149.453556 281.19162 387.07579 281.19162 230.147433 0 365.134488-123.695221 390.892823-274.789198C932.159882 564.612939 841.485446 457.704169 767.99562 396.010514L767.99562 396.010514zM632.610405 786.144178c-14.577986-0.047779-92.001638 0-92.001638 0s0.360999 20.916703 0.360999 31.858155c0 13.362269-12.608418 28.18446-30.403542 27.929638-17.795124-0.249514-30.99282-8.621504-32.452742-28.837444-0.456557-9.17362-0.31322-30.950349-0.31322-30.950349L384.805877 786.144178c-15.013308 0-25.455733-17.083743-24.946088-29.580677 0.44594-12.703977 11.748392-25.965379 24.946088-25.965379L477.959527 730.598122l0.153955-63.76409c0 0-75.51779 0.557425-89.522425 0.557425-14.317854 0-24.240016-9.885-24.80275-22.387242-0.302602-12.650889 11.48826-36.216686 24.80275-36.216686l89.867498 0 0.153955-22.859726c0 0-71.78039-75.96373-80.141762-84.128676-8.276431-8.212726-18.61268-27.016523-5.245102-42.141316 12.703977-14.51428 36.344098-3.981606 47.529756 6.752803 12.401375 11.897038 69.810822 71.074318 69.810822 71.074318s66.938757-62.075889 80.752275-73.590693c13.654254-11.344922 32.463359-12.19964 42.895167 0.652983 10.532675 12.502242 6.296246 24.648794-10.628233 40.171748-16.993494 15.374307-82.472328 82.212197-82.472328 82.212197l0 20.821144 86.353067 0c19.451472 0.552116 30.483174 22.477492 30.14341 34.326751-0.456557 13.505607-8.117167 24.744353-29.686853 24.494839l-86.353067 0.249514-0.456557 63.058018 84.73388 0c22.074023 0 31.30073 11.599745 31.757288 26.666141C658.1033 771.433471 647.321111 786.298133 632.610405 786.144178L632.610405 786.144178zM632.610405 786.144178"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tongji" viewBox="0 0 1042 1024">' +
    '' +
    '<path d="M-14.675968 848.804864M742.685696 64.238592l262.608896 0 0 893.833216-262.608896 0 0-893.833216ZM382.52544 511.148032l262.616064 0 0 446.923776-262.616064 0 0-446.923776ZM21.89824 326.856704l262.608896 0 0 631.216128-262.608896 0 0-631.216128ZM1041.408 848.804864"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zichan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M386.85 289.758h244.617s18.483-54.05 133.683-139.384c-22.05-11.383-53.777 6.213-66.85-4.266-13.995-11.23-11.384-51.2-45.517-55.467S583.1 133.308 583.1 133.308s-31.266 28.45-45.5-15.633-66.85-48.35-83.917-48.35-59.375 12.8-66.85 67.208C383.625 153.6 365.5 160 350.566 151.467s-35.191-14.934-66.133-11.742C320.717 179.54 412.45 267.008 386.85 289.758zM851.917 806.741s1.416-200.533 0-214.75c-4.984-102.4-209.784-238.933-209.784-238.933H391.117c-90.317 51.2-202.667 164.267-214.75 241.067-1.058 3.993-8.533 169.25-11.384 225.416s-39.816 108.8-39.816 108.8 92.45 66.134 396.083 68.267 347.017-52.617 377.6-70.4c-41.25 1.417-46.933-119.467-46.933-119.467zM636.809 770.22c-4.114 26.453-18.825 84.275-98.492 90.043v50.654H482.03v-50.244c-33.638-4.727-64.632-13.431-96.495-24.115l16.879-66.134c25.259 9.865 58.539 20.412 87.842 23.808 39.748 4.626 66.526-3.55 69.018-32.358 5.683-50.483-171.384-59.375-169.711-150.46-2.407-66.918 46.114-96.068 94.48-100.096v-52.65h56.287v50.244c31.966 0.392 57.258 7.287 81.903 18.056l-15.6 62.328c-24.763-9.318-50.09-18.074-80.383-18.074-19.627 0-60.826 0.069-62.242 27.085 0 46.575 77.943 48.981 103.816 59.972 18.859 8.022 31.983 15.855 45.414 28.98 23.45 22.903 28.314 52.411 23.57 82.96z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tongji1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M295.389892 830.116051c0 11.282192-9.134081 20.399891-20.408082 20.399891H138.063769c-11.271954 0-20.371222-9.117699-20.371223-20.399891V535.159262c0-11.262739 9.099269-20.403987 20.371223-20.403987h136.918041c11.274001 0 20.408082 9.141248 20.408082 20.403987v294.956789zM501.516438 830.116051c0 11.282192-9.133057 20.399891-20.424464 20.399891H344.209769c-11.271954 0-20.389652-9.117699-20.389653-20.399891V414.332603c0-11.256595 9.117699-20.406035 20.389653-20.406035h136.882205c11.290383 0 20.424464 9.152511 20.424464 20.406035v415.783448zM707.625578 830.116051c0 11.282192-9.112579 20.399891-20.403987 20.399891h-136.903707c-11.271954 0-20.371222-9.117699-20.371222-20.399891V332.576383c0-11.256595 9.099269-20.398867 20.371222-20.398867h136.903707c11.290383 0 20.403987 9.143296 20.403987 20.398867v497.539668zM913.752124 830.116051c0 11.282192-9.117699 20.399891-20.403987 20.399891h-136.903707c-11.253524 0-20.389652-9.117699-20.389652-20.399891V115.794263c0-11.262739 9.136129-20.39682 20.389652-20.39682h136.903707c11.285264 0 20.403987 9.134081 20.403987 20.39682v714.321788zM921.492697 902.605084c0 11.2525-9.132033 20.408082-20.409106 20.408083H116.279585c-11.271954 0-20.392724-9.154559-20.392724-20.408083v-5.22591c0-11.253524 9.119747-20.389652 20.392724-20.389653H901.083591c11.277073 0 20.409106 9.136129 20.409106 20.389653v5.22591z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-renwu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M786 422.4c-13.4-11.6-33.6-10-45.2 3.4L474.6 735.4l-185.6-156c-13.6-11.4-33.8-9.6-45 4-11.4 13.6-9.6 33.8 4 45l209.8 176.4c6 5 13.4 7.6 20.6 7.6 9 0 18-3.8 24.2-11.2l287-333.6c11.4-13.6 9.8-33.8-3.6-45.2z"  ></path>' +
    '' +
    '<path d="M823 134h-73.6c-22-74-72.6-99.8-100.4-103.8l-2.2-0.2H385.6l-2.2 0.2c-27.8 4-78.4 29.8-100.4 103.8h-80.8C140.4 134 90 184.2 90 245.4v631.4C90 938 140.4 988 202.2 988h620.8c61.8 0 113-50 113-111.2V245.4c0-61.2-51.2-111.4-113-111.4zM341.8 162c12.4-53.4 42.2-65.8 49.8-68h249.6c6.6 2 36.8 14 49.4 68 5.2 22.4 6.8 49.4 4.8 80H337c-2-30.6-0.4-57.4 4.8-80zM872 876.8c0 26-22.4 47.2-49 47.2H202.2C175.6 924 154 902.6 154 876.8V245.4c0-26 21.6-47.4 48.2-47.4h70.4c-0.8 14-0.6 28.6 0.4 44h-13.2c-15.4 0-28 12.6-28 28s12.6 28 28 28h513.2c15.4 0 28-12.6 28-28s-12.6-28-28-28h-13.2c0.8-15.2 1-30 0.2-44h63.2c26.6 0 49 21.4 49 47.4v631.4z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shenfenzheng" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M853.472 824H170.544C125.024 824 88 791.696 88 752V272c0-39.696 37.024-72 82.544-72h682.928c45.52 0 82.528 32.304 82.528 72v480c0 39.696-37.008 72-82.528 72z m-682.928-576c-18.72 0-34.544 10.992-34.544 24v480c0 13.008 15.824 24 34.544 24h682.928c18.72 0 34.528-10.992 34.528-24V272c0-13.008-15.808-24-34.528-24H170.544z"  ></path>' +
    '' +
    '<path d="M832 400a16 16 0 0 1-16 16H528a16 16 0 0 1 0-32h288a16 16 0 0 1 16 16zM832 512a16 16 0 0 1-16 16H528a16 16 0 0 1 0-32h288a16 16 0 0 1 16 16zM832 624a16 16 0 0 1-16 16H528a16 16 0 0 1 0-32h288a16 16 0 0 1 16 16z"  ></path>' +
    '' +
    '<path d="M422.432 619.28c-6.368-40.112-40.048-73.6-80.624-83.952 27.504-11.152 46.96-38.576 46.96-70.64 0-41.952-33.296-75.968-74.368-75.968-41.072 0-74.368 34.016-74.368 75.968 0 32.48 19.952 60.192 48.016 71.056-40.016 10.816-73.408 43.984-79.184 83.536C205.856 640 209.6 640 234.944 640h161.984c28.688 0 28.448-2.272 25.504-20.72z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xinzengkehu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M742.038 792.467h254.675c15.064 0 27.287 12.223 27.287 27.287s-12.223 27.286-27.287 27.286H742.038c-15.065 0-27.287-12.222-27.287-27.286s12.222-27.287 27.287-27.287z"  ></path>' +
    '' +
    '<path d="M896.663 692.416v254.676c0 15.064-12.223 27.287-27.287 27.287s-27.287-12.223-27.287-27.287V692.416c0-15.064 12.223-27.286 27.287-27.286s27.287 12.222 27.287 27.286z"  ></path>' +
    '' +
    '<path d="M105.2 954.713c0-217.117 178.101-393.109 397.794-393.109 96.095 0 184.228 33.668 252.983 89.721a375.241 375.241 0 0 1 69.688-28.822c-48.466-45.982-106.961-81.721-171.934-103.658 80.114-49.658 133.393-137.703 133.393-238.051C787.124 125.717 659.908 0 502.994 0 346.081 0 218.866 125.717 218.866 280.792c0 100.348 53.278 188.394 133.393 238.051-183.383 61.92-315.25 233.668-315.25 435.869 0 3.752 0.054 7.494 0.144 11.225h68.219c-0.106-3.73-0.172-7.47-0.172-11.224z m174.543-673.921c0-121.839 99.947-220.622 223.251-220.622 123.307 0 223.254 98.782 223.254 220.622 0 105.945-75.555 194.421-176.321 215.725a477.192 477.192 0 0 0-93.863 0c-100.765-21.304-176.321-109.78-176.321-215.725z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-kehu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M613.64 700.432c0-84.369-107.147-152.77-239.32-152.77-132.174 0-239.319 68.4-239.319 152.77 0 3.508 0.457 6.94 0.822 10.383H135v51.325h478.638v-51.325h-0.822c0.364-3.444 0.822-6.877 0.822-10.383h0.002zM264.25 374.069c0 60.789 49.279 110.069 110.069 110.069 60.789 0 110.068-49.279 110.068-110.069C484.388 313.28 435.108 264 374.319 264c-60.788 0-110.069 49.28-110.069 110.069zM539.736 374.069c0 60.789 49.279 110.069 110.069 110.069s110.069-49.279 110.069-110.069C759.875 313.28 710.596 264 649.806 264c-60.789 0-110.07 49.28-110.07 110.069zM889.123 700.433c0-84.372-107.147-152.771-239.32-152.771-12.442 0-24.564 0.792-36.495 1.961 46.056 52.279 74.219 120.698 74.219 195.845 0 5.631-0.533 11.123-0.843 16.673H889.12v-51.324h-0.82c0.366-3.446 0.822-6.878 0.822-10.382l0.001-0.002z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)