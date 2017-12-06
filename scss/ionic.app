    /*
To customize the look and feel of Ionic, you can override the variables
in ionic's _variables.scss file.

For example, you might change some of the default colors:


$stable:                          #f8f8f8 !default;
$positive:                        #387ef5 !default;
$calm:                            #11c1f3 !default;
$balanced:                        #33cd5f !default;
$energized:                       #ffc900 !default;
$assertive:                       #ef473a !default;
$royal:                           #886aea !default;
$dark:                            #444 !default;
*/
    
    $yellow: #ffc943 !default;
    $black:#000 !default;
    $light:#fff !default;
    // The path for our ionicons font files, relative to the built CSS in www/css
    $ionicons-font-path: "../lib/ionic/fonts" !default;
    // Include all of Ionic
    @import "www/lib/ionic/scss/ionic";
    $font-family-sans-serif: "Montserrat",
    "AvenirNext-Bold",
    "Montserrat-Bold",
    "Montserrat-Regular",
    "Montserrat-SemiBold",
    "Montserrat-ExtraLight";
    $font-family-light-sans-serif: "Montserrat",
    "Montserrat-Bold",
    "Montserrat-Regular";
    $font-family: "Montserrat-Light",
    "Montserrat-ExtraLight",
    "Montserrat-Bold",
    "Montserrat-Regular",
    "Montserrat-Medium",
    "Montserrat-Italic",
    "Montserrat-SemiBold";
    $font-family-light-sans-serif: "Montserrat-Light",
    "Montserrat-Bold",
    "Montserrat-Regular" "Montserrat-Medium",
    "Montserrat-Italic",
    "Montserrat-SemiBold";
    // @mixin placeholder {
    //     $placeholders: ":-webkit-input" ":-moz" "-moz" "-ms-input";
    //     @each $placeholder in $placeholders {
    //       &:#{$placeholder}-placeholder {
    //         @content;
    //       }
    //     }
    //   }
    @font-face {
        font-family: 'Montserrat-SemiBold';
        src: url("../lib/ionic/fonts/Montserrat-SemiBold.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Medium';
        src: url("../lib/ionic/fonts/Montserrat-Medium.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Light';
        src: url("../lib/ionic/fonts/montserrat/Montserrat-Light.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-ExtraLight';
        src: url("../lib/ionic/fonts/Montserrat-ExtraLight.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Italic';
        src: url("../lib/ionic/fonts/Montserrat-Italic.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Regular';
        src: url("../lib/ionic/fonts/Montserrat-Regular.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Bold';
        src: url("../lib/ionic/fonts/Montserrat-Bold.ttf");
    }
    
    @font-face {
        font-family: 'Montserrat-Bold';
        src: url("../fonts/montserrat/Montserrat-Bold.otf");
    }
    
    body {
        font-family: 'Montserrat-Regular';
    }
    
    .absolute {
        position: absolute;
    }
    
    .relative {
        position: relative;
    }
    
    .text-right {
        text-align: right;
    }
    
    .text-left {
        text-align: left;
    }
    
    .button {
        border-radius: 0px;
    }
    
    .bar.bar-stable {
        background-color: transparent!important;
        border: none;
    }
    
    .bartitle {
        .bar.bar-stable .title {
            color: transparent!important;
        }
    }
    
    .bar.bar-stable .title {
        color: transparent;
    }
    
    .bg-color {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 30%, rgba(224, 224, 224, 1) 99%)!important;
    }
    
    .ionslide {
        height: 600px!important;
    }
    
    .sliderlabel {
        font-size: 24px;
        font-family: 'Montserrat-Regular';
    }
    
    .slidertext {
        padding: 10px;
        label {
            font-size: 18px;
            font-family: 'Montserrat-ExtraLight';
        }
    }
    
    .skipButton {
        position: absolute;
        top: 97%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-top: 2px solid #424242 !important;
        border-bottom: none;
        border-right: none;
        border-left: none;
        background: transparent;
        border-radius: 0px;
        min-height: 35px !important;
        font-size: 20px;
        line-height: 2px;
        z-index: 10;
    }
    
    .sliderbutton {
        .swiper-pagination {
            bottom: 60px;
        }
    }
    
    .swipperbutton {
        .swiper-pagination-bullet {
            background: #444444;
        }
    }
    
    //end of home slider css
    //trailerstart
    .removebar {
        .bar {
            padding: 0px!important;
            height: 0px!important;
        }
    }
    
    //   .bar  .title{
    //         line-height: 0px!important; 
    //         height: 0px!important;
    // }
    .closenavbar {
        font-size: 35px;
        padding: 5px 5px 0px 0px;
        color: #f9b90e;
    }
    
    // .bar{
    //     height: 0px!important;
    //     padding: 0px!important
    // }
    .Trailertitle {
        padding-top: 12px;
        span {
            font-family: "Montserrat-Light";
            font-size: 16px;
        }
    }
    
    .pollingtitle {
        padding-top: 12px;
        span {
            font-family: "Montserrat-Light";
            font-size: 15px;
        }
    }
    
    .trailerImage {
        width: 100%;
        img {
            width: 100%
        }
    }
    
    .trailerName {
        padding: 20px 20px 5px;
        text-align: left;
        label {
            font-family: "Montserrat-Medium";
            font-size: 14px;
        }
    }
    
    .articleDate {
        font-family: "Montserrat-Regular";
        color: #afafaf;
        font-size: 10px;
    }
    
    .readarticle {
        padding: 5px;
        font-family: "Montserrat-Italic";
        color: #afafaf;
        font-size: 10px;
    }
    
    .chooseside {
        height: 200px;
    }
    
    .bg-yellow {
        margin-top: 20px;
        padding: 15px 0px;
        background-color: #fcc230;
        box-shadow: inset 0px -5px 20px rgba(0, 0, 0, 0.26);
        text-align: center;
        h3 {
            padding: 0px!important;
            margin: 0px!important;
            font-family: "Montserrat-SemiBold";
            font-weight: 700;
            font-size: 18px;
        }
        label {
            color: white;
            font-size: 12px;
            letter-spacing: 4px;
            font-family: "Montserrat-Regular";
        }
    }
    
    .fs-10 {
        font-size: 10px;
    }
    
    .yourSide {
        margin-top: 20px;
        text-align: center;
        img {
            width: 70%
        }
    }
    
    .yoursideright {
        border-right: 1px solid #d4d4d4;
        height: 35px;
        position: absolute;
        right: 0px;
        top: 33%;
        transform: translate(-50%, -50%);
    }
    
    .yourside-labelsel {
        font-family: "Montserrat-Bold";
    }
    
    .yourside-label {
        font-family: "Montserrat-Regular";
    }
    
    .trailernext {
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        background: black;
        color: white;
        border-radius: 0px;
        padding: 0px 15px;
        height: 40px;
        width: 150px;
        border: none;
        margin-bottom: 20px;
        font-family: 'Montserrat-Bold';
        font-size: 12px;
        letter-spacing: 1px;
    }
    
    .pad-left5 {
        padding-left: 5px;
    }
    
    .martop {
        margin-top: 10px;
    }
    
    .footerImg {
        text-align: center;
        padding: 8px 0px 0px 0px;
        width: 35%;
        display: block;
        margin: 0 auto;
        img {
            width: 100%!important;
        }
    }
    
    .footerKwackImg {
        text-align: center;
        padding: 8px 0px 0px 0px;
        width: 45%;
        display: block;
        margin: 0 auto;
        img {
            width: 100%!important;
        }
    }
    
    .yellowStrip {
        width: 100%;
        line-height: 10px;
        img {
            width: 100%;
        }
    }
    
    //trailercssendshere
    //**********css given by kishori**********
    //signup start
    .content-mar {
        margin: 60px 45px;
        .item {
            border: none;
        }
    }
    
    .w56 {
        width: 56%;
    }
    
    .w100 {
        width: 100%;
    }
    
    .social-icon {
        text-align: right;
        margin-right: -18px;
        margin-top: 30px;
        li {
            width: 23% !important;
            display: inline-block;
        }
        p {
            margin-right: 50px;
            font-family: "Montserrat-Regular";
            padding-top: 7px;
            letter-spacing: 1px;
        }
    }
    
    .back-white {
        background-color: #fff;
        box-shadow: 0px 3px 9px rgba(136, 136, 136, 0.34);
        padding: 0px 20px 0px 10px;
        margin-top: 7px;
        label {
            margin: 10px 0px;
        }
        .list {
            padding: 30px 0px;
        }
    }
    
    .border-bot {
        border-bottom: 1px solid rgba(136, 136, 136, 0.21) !important;
    }
    
    .btn-yellow {
        color: #000;
        background-color: rgb(255, 182, 0);
        background: linear-gradient(to right top, #ffb600 30%, #ffb600 30%, #fbcf60 99%)!important;
        letter-spacing: 4px;
        font-size: 14px;
        font-family: "Montserrat-Regular";
        padding: 7px 65px;
        border-radius: 0px!important;
        border: none;
        // font-family: "Montserrat-Regular";
    }
    
    .title {
        h5 {
            // font-family: "Montserrat-Bold";
            color: #fff;
            font-family: "Montserrat-Bold";
            padding: 10px;
            letter-spacing: 1px;
        }
        span {
            font-family: "Montserrat-Regular";
        }
    }
    
    .footer {
        .bar-footer {
            height: 57px;
            background-color: transparent;
        }
    }
    
    //end of .sign-up
    //logincsssatrts
    .content-margin {
        margin: 0px 45px;
        .item {
            border: none;
        }
    }
    
    .forgotPassword {
        text-align: right;
        margin-right: 26px;
        font-family: 'Montserrat-SemiBold'
    }
    
    .social-iconl {
        text-align: right;
        margin-right: -18px;
        margin-top: 0px;
        li {
            width: 23% !important;
            display: inline-block;
        }
        p {
            margin-right: 50px;
            font-family: "Montserrat-Regular";
            padding-top: 7px;
            letter-spacing: 1px;
        }
    }
    
    //loginends
    //start of profile
    .profile-pic {
        width: 280px;
        height: 280px;
        margin-top: 30px;
        padding: 40px 55px;
        background-color: white;
        box-shadow: 0px 11px 60px rgba(128, 128, 128, 0.45);
        border-radius: 100%;
    }
    
    .plus-btn {
        right: 5%;
        top: 91%;
        transform: translate(-50%, -50%);
        .button {
            min-width: 45px !important;
            min-height: 45px !important;
            border-radius: 93%;
            background: linear-gradient(to right top, #ffb600 30%, #ffb600 30%, #fbcf60 99%)!important;
            color: black;
            i {
                font-size: 13px;
            }
        }
    }
    
    .arrow-back {
        margin-top: 9px;
        .button {
            background: transparent;
            border: none;
            i {
                color: #fff;
                font-size: 20px;
            }
        }
    }
    
    .skip {
        color: #fff;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 1px;
        margin-top: 12px;
        font-family: 'Montserrat-Bold';
    }
    
    //end of .profile-pic
    //start of filter
    .reset {
        font-family: 'Montserrat-Regular';
        font-size: 12px;
        letter-spacing: 0.5px;
        margin-right: 23px;
        color: #000;
    }
    
    .bg-gray {
        background-color: #f2f2f2;
    }
    
    .filter {
        h4 {
            color: #6b6b6b;
            letter-spacing: 2px;
            padding: 13px 0px 13px 46px;
            font-size: 16px;
            font-family: 'Montserrat-Light';
            box-shadow: inset 0px -2px 6px rgba(222, 216, 216, 0.46);
        }
        .button {
            margin: 5px 3px;
            border-radius: 0px;
        }
    }
    
    .mar-l15 {
        margin-left: 15px;
    }
    
    .select-month {
        padding: 8px 32px;
        // margin: 5px 0px 5px 35px;
        background-color: $black;
        color: $light;
        border: none;
        font-family: 'Montserrat-Regular';
    }
    
    .select-year {
        padding: 9px 41px;
        // margin: 5px 36px 5px 0px;
        background-color: $yellow;
        color: $black;
        border: none;
    }
    
    .category-preferences {
        background: linear-gradient(to top, white 14%, white 36%, rgba(224, 224, 224, 0.41) 90%) !important;
        padding: 0px 25px;
        .input-category {
            width: 325px;
            margin: 15px 0px;
            box-shadow: inset 0px 0px 6px rgba(34, 33, 33, 0.22);
        }
        h6 {
            font-size: 13px;
            color: #444444;
            font-family: 'Montserrat-Regular';
            padding: 20px 0px 0px 20px;
        }
    }
    
    .filter-btns {
        margin-bottom: 15px;
        .btn-sports {
            padding: 0px 23px;
        }
        .btn-science {
            padding: 0px 14px;
        }
        .btn-food {
            padding: 0px 28px;
        }
        .btn-science {
            padding: 0px 14px;
        }
        .btn-entertainment {
            padding: 0px 39px;
        }
        .btn-fashion {
            padding: 0px 17px;
        }
        .btn-international {
            padding: 0px 49px;
        }
        .btn-health {
            padding: 0px 22px;
        }
        .btn-books {
            padding: 0px 22px;
        }
        .btn-comedy {
            padding: 0px 15px;
        }
    }
    
    .btn-tran {
        background: transparent !important;
    }
    
    .all-category {
        margin: 0px 10px;
    }
    
    .all {
        width: 51px;
        // height: 50px;
        margin: 20px 0px 20px 24px;
        img {
            width: 18px;
            vertical-align: middle;
        }
        span {
            padding-left: 9px;
            font-family: "Montserrat-Regular";
        }
    }
    
    .polls {
        width: 71px;
        // height: 50px;
        margin: 20px 0px 20px 4px;
        ;
        img {
            width: 25px;
            vertical-align: middle;
        }
        span {
            padding-left: 9px;
            font-family: "Montserrat-Regular";
        }
    }
    
    .kwack {
        width: 96px;
        // height: 50px;
        margin: 20px 0px 20px 0px;
        img {
            width: 17px;
            vertical-align: middle;
        }
        span {
            padding-left: 9px;
            font-family: "Montserrat-Regular";
        }
    }
    
    //start of otp
    .otp-input {
        width: 50px;
        background: transparent;
        border-bottom: 1px solid rgba(136, 136, 136, 0.97) !important;
        // display: inline;
    }
    
    .otp {
        margin-top: 18%;
        p {
            color: #5a5a5a;
        }
        a {
            color: #5a5a5a;
            text-decoration: underline;
            font-size: 12px;
            font-family: "Montserrat-Regular";
            letter-spacing: 1px;
        }
    }
    
    .input-mar {
        margin: 0 auto;
        text-align: center;
    }
    
    .mar-r {
        margin-right: 10px;
    }
    
    .input-padd {
        padding: 50px 5px 15px 5px;
    }
    
    //end of otp
    //start of discover
    .bg-color-yellow {
        background: linear-gradient(to right bottom, #ffb600 30%, #ffb600 56%, #f7c84e 99%)!important;
    }
    
    .title-discover {
        font-family: 'Montserrat-Bold';
        letter-spacing: 4px;
        padding-top: 5px;
        font-size: 26px;
    }
    
    .discover-para {
        padding: 0px 50px;
        font-family: 'Montserrat-Regular';
    }
    
    .input-category {
        width: 300px;
        height: 45px !important;
        border-radius: 25px;
        margin-bottom: 10px;
        box-shadow: inset 0px 1px 21px rgba(34, 33, 33, 0.22);
        background: #f0ab05;
    }
    
    .btn-bg {
        background-color: #ffc943;
        box-shadow: 0px 0px 2px rgba(128, 128, 128, 0.27);
        margin: 7px 5px;
        font-size: 13px;
        font-family: 'Montserrat-Regular';
    }
    
    .btn-bg-black {
        background: linear-gradient(to right bottom, #000 30%, #000 57%, #2b2727 100%)!important;
        border: none;
        color: #fff;
        font-size: 13px;
        font-family: 'Montserrat-Regular';
        margin: 7px 5px;
    }
    
    .align-right {
        text-align: right;
        margin-right: 40px;
    }
    
    .align-left {
        text-align: left;
        margin-left: 36px;
    }
    
    .btn-sports {
        padding: 7px 23px;
    }
    
    .btn-comedy {
        padding: 7px 17px;
    }
    
    .btn-food {
        padding: 7px 29px;
    }
    
    .btn-science {
        padding: 7px 17px;
    }
    
    .btn-entertainment {
        padding: 7px 47px;
    }
    
    .btn-international {
        padding: 7px 56px;
    }
    
    .btn-books {
        padding: 7px 24px;
    }
    
    .btn-health {
        padding: 7px 24px;
    }
    
    .cat-btn-plus {
        top: 0px;
        right: 0px;
        .button {
            background: transparent;
            font-size: 12px;
        }
    }
    
    //end of discover
    //start of explore
    .title-explore {
        font-size: 16px;
        font-family: 'Montserrat-Bold';
        letter-spacing: 6px;
        position: relative;
    }
    
    .title-explore:before {
        content: "";
        position: absolute;
        width: 97px;
        top: 50%;
        left: 5%;
        border-bottom: 1px solid #bebebe;
    }
    
    .title-explore:after {
        content: "";
        width: 97px;
        position: absolute;
        top: 50%;
        right: 5%;
        border-bottom: 1px solid#bebebe;
    }
    
    .news-content {
        margin-bottom: 20px;
        .card {
            margin: 7px 20px;
            background-color: transparent;
            box-shadow: 0px 2px 25px rgba(67, 64, 64, 0.21);
            .item {
                margin-right: 3px;
                margin-left: 3px;
            }
        }
        .item {
            z-index: -3;
            margin: -10px;
            padding-bottom: 5px;
        }
    }
    
    .just-now-label {
        top: 7%;
        right: 15px;
        background: #ffb600;
        font-size: 10px;
        font-family: 'Montserrat-Regular';
        padding: 3px 11px;
        z-index: 1;
    }
    
    .movie-label {
        bottom: 4%;
        left: 5px;
        background: black;
        color: white;
        font-size: 10px;
        font-family: 'Montserrat-Regular';
        padding: 3px 13px;
        letter-spacing: 1px;
    }
    
    .news-content {
        h3 {
            // font-weight: bold;
            font-family: 'Montserrat-Medium';
            margin-top: 0px;
            margin-bottom: 0px;
        }
        span {
            font-size: 9px;
            font-family: 'Montserrat-Regular';
            img {
                vertical-align: middle;
                width: 3%;
            }
        }
    }
    
    .detail-para {
        margin-bottom: 15px;
        p {
            font-size: 11px;
            font-family: 'Montserrat-Regular';
            line-height: 14px;
            margin-top: 0px;
            color: #000 !important;
        }
    }
    
    .date-time {
        margin: 3px 0px;
    }
    
    .explore-icon {
        text-align: right;
        img {
            width: 12%;
            vertical-align: middle;
            padding: 4px;
        }
        span {
            color: #bbbdbf;
        }
    }
    
    .padd-r {
        padding-right: 15px;
    }
    
    .padd-lr {
        padding: 0px 16px;
    }
    
    //end of explore
    //start of invite friends
    .followers {
        width: 100%;
        position: absolute;
        top: 90%;
        box-shadow: 0px 0px 26px rgba(128, 128, 128, 0.47);
        .dis-table {
            background-color: #fff;
            box-shadow: inset 0px -3px 5px rgba(128, 128, 128, 0.13);
            border-radius: 5px 5px 0px 0px;
            margin: 0 auto;
        }
        .dis-cell {
            padding: 20px;
            position: relative;
            h3 {
                font-family: 'Montserrat-Light';
            }
            span {
                font-family: 'Montserrat-Regular';
                font-size: 13px;
            }
        }
    }
    
    .dis-table {
        display: table;
    }
    
    .dis-cell {
        display: table-cell;
    }
    
    .cell-follower {
        padding: 0px 5px;
    }
    
    .r-border:after {
        content: "";
        height: 68px;
        position: absolute;
        top: 17%;
        right: 0%;
        border-right: 2px solid #bebebe;
    }
    
    .cell-kwacks {
        padding: 0px 18px;
    }
    
    .cell-polls {
        padding: 0px 18px;
    }
    
    .toggleyouKnow {
        width: 185px;
        float: left;
        padding: 5px 0px;
        margin: 5px 0px 10px 0px;
        font-size: 11px;
        font-family: 'Montserrat-Regular';
        background: #f3f2f2;
        border-radius: 25px;
        position: absolute;
        left: 5%;
    }
    
    .toggleContacts {
        width: 185px;
        float: right;
        padding: 5px 0px;
        margin: 5px 0px 10px 0px;
        font-size: 11px;
        font-family: 'Montserrat-Regular';
        background: #f3f2f2;
        border-radius: 25px;
        position: absolute;
        right: 4%;
    }
    
    .select {
        background: #ffb600;
        z-index: 100;
    }
    
    .listperson {
        top: 88px;
        overflow-y: scroll;
        width: 100%;
        max-height: 255px;
        .item {
            border: none!important;
        }
        h2 {
            font-family: 'Montserrat-Regular';
            font-size: 14px;
        }
        p {
            font-family: 'Montserrat-Light';
        }
    }
    
    .borderF {
        .cell-follower:after {
            content: "";
            position: absolute;
            width: 75px;
            border-bottom: 2px solid #f8b503;
            bottom: -1%;
            left: 17%;
        }
    }
    
    .borderK {
        .cell-kwacks:after {
            content: "";
            position: absolute;
            width: 75px;
            border-bottom: 2px solid #f8b503;
            bottom: -1%;
            left: 17%;
        }
    }
    
    .borderp {
        .cell-polls:after {
            content: "";
            position: absolute;
            width: 75px;
            border-bottom: 2px solid #f8b503;
            bottom: -1%;
            left: 17%;
        }
    }
    
    .followersUn {
        position: absolute;
        width: 12%;
        top: 35%;
        right: 5%;
    }
    
    //common classes and ionic classes start
    .bar-stable .button.button-clear {
        border-color: transparent;
        background: none;
        box-shadow: none;
        color: #444;
        font-size: 17px;
        display: none;
    }
    
    .bar-black {
        background: black!important;
    }
    
    .pad-10 {
        padding: 10px!important;
    }
    
    .padt10 {
        padding-top: 10px;
    }
    
    .pad2010 {
        padding: 20px 10px;
    }
    
    .pad-5 {
        padding: 5px;
    }
    
    .pad-15 {
        padding: 15px!important;
    }
    
    .aligntop {
        vertical-align: top;
    }
    
    .alignM {
        vertical-align: middle;
    }
    
    .colorw {
        color: white;
    }
    
    .w25 {
        width: 25%;
    }
    
    .mar-auto {
        margin: 0 auto;
    }
    
    .font-size {
        font-size: 13px;
        font-family: 'Montserrat-Regular';
        letter-spacing: 2px;
    }
    
    .has-header {
        top: 60px;
    }
    
    .w40 {
        width: 40%;
    }
    
    .w15 {
        width: 15%;
    }
    
    .no-header {
        top: 42px;
    }
    
    .no-top {
        top: 0px!important;
    }
    
    .display-inline {
        display: inline-block;
    }
    
    .dis-inline {
        display: inline;
    }
    
    .plus-icon {
        color: black;
    }
    
    .mar-t30 {
        margin-top: 30%;
    }
    
    .mart40 {
        margin-top: 40px;
    }
    
    .mar60 {
        margin-top: 60px;
    }
    
    .has-footer {
        bottom: 40px;
    }
    
    .float-right {
        float: right;
    }
    
    .rel {
        position: relative;
    }
    
    .customFooter {
        margin: 0px!important;
        padding: 0px!important;
        box-shadow: 0px -15px 25px rgba(0, 0, 0, 0.11);
    }
    
    .border-r {
        border-right: 1px solid #d4d4d4;
    }
    
    .pad-left10 {
        padding-left: 10px;
    }
    
    .pad0 {
        padding: 0px!important;
    }
    
    .sign-up {
        bottom: -29px;
        right: -37px;
    }
    
    .invtfrndshdr {
        top: 160px;
    }
    
    //discovernewscsss
    .discover-navsearch {
        text-align: right;
        font-size: 30px;
        padding-right: 15px;
    }
    
    .discover-navmenu {
        width: 25%;
        margin: 5px;
        img {
            width: 100%;
        }
    }
    
    .discover-head {
        font-size: 18px;
        font-family: "Montserrat-Bold"
    }
    
    .discover-trend {
        text-align: center;
        font-family: "Montserrat-Medium";
        font-size: 12px;
        letter-spacing: 3px;
    }
    
    .discover-ionslide {
        height: 200px!important;
        padding-top: 10px;
    }
    
    .bodyFont {
        font-size: 14px;
    }
    
    .sliderdesc {
        color: white;
        position: absolute;
        transform: translate(-50%, -50%);
        bottom: 16%;
        left: 50%;
        width: 100%;
        /* display: block; */
        font-size: 15px;
        font-family: 'Montserrat-Regular';
        padding: 10px;
    }
    
    .slidertime {
        position: absolute;
        bottom: 30%;
        left: 0%;
        padding-left: 10px;
        width: 100%;
        label {
            vertical-align: middle;
            color: white;
            font-size: 11px;
        }
        i {
            color: white;
            vertical-align: inherit;
        }
    }
    
    .strip {
        position: absolute;
        bottom: 29%;
        right: 2%;
    }
    
    .stripDiv {
        width: 10%;
    }
    
    .stripImg {
        width: 100%;
    }
    
    .discoverStrip {
        padding: 2px;
        span {
            padding-right: 8px;
            border-right: 1px solid #414141;
        }
    }
    
    .discoverCardStrip {
        padding: 2px;
        span {
            padding-right: 8px;
            border-right: 1px solid #ececec;
        }
    }
    
    .news-discover {
        .card {
            margin: 7px 10px;
            background-color: transparent;
            box-shadow: none;
            box-shadow: 0px 0px 30px rgba(128, 128, 128, 0.88);
            .item {
                margin-right: 3px;
                margin-left: 3px;
            }
        }
        .item {
            z-index: -3;
            margin: -10px;
        }
    }
    
    .news-discover {
        h3 {
            // font-weight: 900px;
            font-family: "Montserrat-Medium";
            font-size: 14px;
            margin-top: 7px;
            margin-bottom: 0px;
        }
        span {
            font-size: 10px;
            img {
                vertical-align: middle;
            }
        }
        p {
            font-size: 11px;
            font-family: 'Montserrat-Regular';
            line-height: 14px;
            margin-top: 7px;
            padding-bottom: 10px;
        }
    }
    
    .discover-icon {
        text-align: right;
        img {
            width: 12%;
            vertical-align: middle;
            padding: 5px;
        }
        span {
            color: white;
            font-size: 14px;
        }
    }
    
    .viewImg {
        width: 6%;
    }
    
    .kwackheaderImg {
        text-align: center;
        width: 35%;
        margin: 0 auto;
        img {
            width: 100%;
        }
    }
    
    .wide-as-needed {
        overflow: scroll;
        white-space: nowrap;
    }
    
    .scroll {
        min-width: 100%;
    }
    
    .bar.bar-loading {
        display: block;
        height: 24px;
        /* starts right below a normal header */
        top: 44px;
        /* make the text centered vertically and horizontally */
        text-align: center;
        padding: 0;
        line-height: 24px;
        /* transition 'sliding down' (check below)*/
        -webkit-transition: 200ms all;
    }
    /* 
   * make the content's top changes animate.
   * might not always look good, but looks
   * good when our loader is added & removed
   */
    
    .has-header {
        -webkit-transition: 200ms top;
    }
    
    .has-header.has-loading {
        /* 44px (header) + 24px */
        top: 68px;
    }
    /* make loading bar slide up/down */
    
    .bar-loading.ng-enter,
    .bar-loading.ng-leave.ng-leave-active {
        height: 0;
        border-width: 0px;
    }
    
    .bar-loading.ng-enter.ng-enter-active,
    .bar-loading.ng-leave {
        height: 24px;
        border-width: 1px;
    }
    
    .scrollCategories {
        color: gray;
        padding: 5px;
        font-size: 13px;
        font-family: 'Montserrat-Regular';
    }
    
    .swipperdiscover {
        .swiper-pagination-bullet {
            background: #ffb600;
        }
    }
    
    //endofdiscover
    //discovernewsend
    // .discover-sliderbutton{
    //     .swiper-pagination {
    //         bottom: 8px;
    //     }
    // }
    .back-img {
        position: relative;
    }
    
    .back-img-title {
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .profile-img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        overflow: hidden;
    }
    
    .user-name {
        color: #fff;
        letter-spacing: 1px;
        font-size: 17px;
        font-family: 'Montserrat-SemiBold';
        text-shadow: 1px solid red;
        text-shadow: 0px 0px 2px gray;
    }
    
    .profile-padd {
        vertical-align: middle;
        padding: 10px 20px;
    }
    
    .designation {
        color: #fff;
        letter-spacing: 0.5px;
        line-height: 4px;
        font-size: 12px;
        font-family: 'Montserrat-Regular';
    }
    
    .follow-btn {
        vertical-align: middle;
        .button {
            margin-top: 7px;
            min-height: 27px;
            line-height: 10px;
            font-size: 11px;
            padding: 0px 20px;
            border-radius: 50px;
            background: transparent;
            color: #fff;
            border-color: #fff;
            letter-spacing: 0.5px;
            font-family: 'Montserrat-Regular';
        }
        .icon-left:before {
            font-size: 12px;
            line-height: 10px;
            padding-right: 10px;
            color: #ffb600;
            font-weight: 600;
        }
    }
    
    //locationcssstart
    .theCombo {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-background-clip: padding;
        -moz-background-clip: padding;
        background-clip: padding-box;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        -ms-border-radius: 0;
        -o-border-radius: 0;
        border-radius: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: black;
        cursor: pointer;
        padding: 10px;
        padding-right: 20px;
        outline: none;
        border: 2px solid black;
        width: 100%;
        height: 35px;
        line-height: 25px;
        font-size: 16px;
        vertical-align: middle;
        display: inline-block;
        *display: inline;
        *zoom: 1;
        background-color: transparent;
        padding-bottom: 0px!important;
        /* line-height: 22px; */
        padding-left: 1px!important;
        margin-bottom: 0px!important;
        border: none;
        border-bottom: 2px solid #f2f2f2;
        // background-image: url("/img/plus.png");
        background-repeat: no-repeat;
        background-position: right center;
    }
    
    .plusposition {
        position: absolute;
        top: 40%;
        /* transform: translate(-20%,-50%); */
        right: 5%;
    }
    
    .locationtHead {
        color: black!important;
        font-size: 1.2em;
        font-family: "Montserrat-Regular" !important;
    }
    
    .cardBox {
        .card {
            box-shadow: 0 1px 20px rgba(0, 0, 0, 0.3);
        }
    }
    
    //     border-radius: 25px;
    //     position: absolute;
    //     left: 5%;
    // }
    .toggleContacts {
        width: 185px;
        float: right;
        padding: 5px 0px;
        margin: 5px 0px 10px 0px;
        font-size: 11px;
        letter-spacing: 0.5px;
        background: #f3f2f2;
        border-radius: 25px;
        position: absolute;
        right: 4%;
    }
    
    .select {
        background: #ffb600;
        z-index: 100;
    }
    
    //start of social
    .toi {
        width: 70%;
        margin: 0 auto;
    }
    
    .news-video {
        p {
            color: #000;
            font-size: 12px;
            font-family: 'Montserrat-Regular';
            letter-spacing: 1px;
            line-height: 14px;
            padding-top: 11px;
        }
        span {
            font-size: 12px;
            font-family: 'Montserrat-SemiBold';
            color: #000;
            letter-spacing: 0.5px;
        }
    }
    
    .added {
        font-family: 'Montserrat-Light' !important;
        color: #bebebe !important;
    }
    
    .show-time {
        margin-top: 10px;
        img {
            width: 10% !important;
        }
    }
    
    .mar-lr {
        margin: 0px 20px;
    }
    
    .social-icons {
        padding: 10px 0px;
        border-bottom: 1px solid #f0e2e2;
    }
    
    .border-top {
        border-top: 1px solid #f0e2e2;
        margin: 25px 20px 5px 20px;
    }
    
    .color-yellow {
        color: $yellow !important;
    }
    
    .w3 {
        width: 3%;
    }
    
    //footer starts
    .borderclass {
         a{
            border-right: 1px solid #000!important;
        }    
    }
    
    .tabimage {
        background-image: url("/img/footer/homeOn.png");
        background-repeat: no-repeat;
        background-position: center center;
          a{
            border-right: 1px solid #000!important;
        } 
    }
    
    .discoverImage {
        background-image: url("/img/footer/discoverOn.png");
        background-repeat: no-repeat;
        background-position: center center;
    }
    
    .socialImage {
        background-image: url("/img/footer/socialOn.png");
        background-repeat: no-repeat;
        background-position: center center;
    }
    
    .inviteFImage {
        background-image: url("/img/footer/inviteOn.png");
        background-repeat: no-repeat;
        background-position: center center;
    }
    
    .profileFImage {
        background-image: url("/img/footer/profileOn.png");
        background-repeat: no-repeat;
        background-position: center center;
    }
    
    .tab-header {
        position: relative;
        span {
            position: absolute;
            top: 88%;
            transform: translate(-50%, -50%);
            left: 50%;
            font-size: 11px;
        }
        a{
            border-right: 1px solid gray;
        }
    }
    
    //footerends
    .has-footer.has-tabs {
        bottom: 50px;
    }
    
    .placeholderCat {
        input {
            padding-left: 15px;
            font-size: 14px;
        }
        input::placeholder {
            color: #000;
            font-family: "Montserrat-Regular";
        }
    }
    
    .placeholderDiscover {
        input {
            padding-left: 15px;
            font-size: 14px;
        }
        input::placeholder {
            color: #6c4b01;
            font-family: "Montserrat-Regular";
            // padding-left: 15px;
        }
    }
    
    .signupPlaceholder {
        // input {
        //     padding-left: 15px;
        //     font-size: 14px;
        // }
        input::placeholder {
            color: #8f8f8f;
            font-family: "Montserrat-Regular";
        }
    }
    
    //filterpopupstart
    .popupHeader {
        top: 55px;
    }
    
    .w80 {
        width: 80%
    }
    
    .nav-height {
        height: 65px;
    }
    
    .modal-bg {
        background: transparent;
    }
    
    .divColor {
        background: white;
    }
    
    .content-bg {
        background: rgba(0, 0, 0, 0.68);
    }
    
    .closePopup {
        text-align: center;
        padding: 20px;
        i {
            font-size: 35px;
            color: white;
        }
    }
    
    .social-iconll {
        text-align: right;
        margin-right: -18px;
        margin-top: 0px;
        li {
            width: 21%;
            display: inline-block;
        }
        p {
            margin-right: 50px;
            margin-top: 30px;
            font-size: 14px;
        }
    }
    
    //filterpopupend
    // css for iphone 5
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
        .social-iconll p {
            margin-right: 26px;
            margin-top: 30px;
            font-size: 12px;
        }
        .social-iconll li {
            width: 18%;
        }
        .plus-btn {
            right: 8%;
            top: 92%;
        }
        .news-discover {
            span {
                font-size: 8px;
            }
        }
        .discoverCardStrip {
            padding: 0px;
        }
        .explore-icon img {
            width: 10%;
            vertical-align: middle;
            padding: 1px;
        }
        .discover-icon {
            img {
                width: 10%
            }
            span {
                font-size: 12px;
            }
        }
        .discoverStrip {
            padding: 0px;
            span {
                padding-right: 5px;
            }
        }
        .sliderdesc {
            bottom: 21%;
            font-size: 14px;
        }
        .strip {
            bottom: 37%;
            right: 1%
        }
        .slidertime {
            bottom: 37%;
        }
        .title-explore {
            font-size: 15px;
            letter-spacing: 5px;
        }
        .title-explore:before {
            width: 71px !important;
            top: 50%;
            left: 7%;
            border-bottom: 2px solid rgba(190, 190, 190, 0.56);
        }
        .title-explore:after {
            width: 71px !important;
            top: 50%;
            right: 7%;
            border-bottom: 2px solid rgba(190, 190, 190, 0.56);
        }
        .discover-icon {
            img {
                width: 10%
            }
            span {
                font-size: 12px;
            }
        }
        .discoverStrip {
            padding: 0px;
            span {
                padding-right: 5px;
            }
        }
        .sliderdesc {
            bottom: 21%;
            font-size: 14px;
        }
        .strip {
            bottom: 37%;
            right: 1%
        }
        .slidertime {
            bottom: 37%;
        }
        .title-explore {
            font-size: 15px;
            letter-spacing: 5px;
        }
        .title-explore:before {
            width: 71px !important;
            top: 50%;
            left: 7%;
            border-bottom: 2px solid rgba(190, 190, 190, 0.56);
        }
        .title-explore:after {
            width: 71px !important;
            top: 50%;
            right: 7%;
            border-bottom: 2px solid rgba(190, 190, 190, 0.56);
        }
        .just-now-label {
            top: 6%;
        }
        .toggleyouKnow {
            width: 155px;
            font-size: 10px;
        }
        .toggleContacts {
            width: 155px;
            font-size: 10px;
        }
        .followers .dis-cell {
            padding: 14px;
            position: relative;
        }
        .followers .dis-cell h3 {
            font-size: 18px;
        }
        .followers .dis-cell span {
            font-size: 12px;
        }
        .user-name {
            font-size: 15px;
        }
        .designation {
            line-height: 2px;
            font-size: 11px;
        }
        .follow-btn .button {
            margin-top: 5px;
            min-height: 21px;
            line-height: 10px;
            font-size: 9px;
            padding: 0px 16px;
        }
        .r-border:after {
            height: 55px;
        }
        .listperson {
            top: 70px;
        }
        .profile-img {
            width: 75px;
            height: 75px;
        }
        .btn-yellow {
            padding: 0px 40px;
            font-size: 10px;
        }
        .social-icon p {
            margin-right: 23px;
            font-size: 10px;
        }
        .social-icon {
            margin-bottom: 60px;
        }
        .social-icon li {
            width: 19% !important;
        }
        .btn-books {
            margin-bottom: 65px;
        }
        .kwack {
            margin: 20px 0px 45px 0px;
        }
    }
    
    // css for iphone 6 nd 6plus
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {
        .news-discover {
            span {
                font-size: 10px;
            }
        }
        .explore-icon {
            img {
                width: 12%;
                padding: 4px;
            }
        }
        .discoverCardStrip {
            padding: 2px;
            span {
                padding-right: 8px;
                border-right: 1px solid #ececec;
            }
        }
        .discover-icon {
            img {
                width: 12%
            }
            span {
                font-size: 14px;
            }
        }
        .discoverStrip {
            padding: 2px;
            span {
                padding-right: 8px;
            }
        }
        .strip {
            bottom: 29%;
            right: 2%;
        }
        .sliderdesc {
            bottom: 16%;
            font-size: 15px;
        }
        .slidertime {
            bottom: 30%;
        }
        .title-explore {
            font-size: 16px;
            letter-spacing: 5px;
        }
        .title-explore:before {
            width: 100px !important;
            left: 5%;
        }
        .title-explore:after {
            width: 100px !important;
            right: 5%;
        }
        .discover-icon {
            img {
                width: 12%
            }
            span {
                font-size: 14px;
            }
        }
        .discoverStrip {
            padding: 2px;
            span {
                padding-right: 8px;
            }
        }
        .strip {
            bottom: 29%;
            right: 2%;
        }
        .sliderdesc {
            bottom: 16%;
            font-size: 15px;
        }
        .slidertime {
            bottom: 30%;
        }
        .title-explore {
            font-size: 16px;
            letter-spacing: 5px;
        }
        .title-explore:before {
            width: 100px !important;
            left: 5%;
        }
        .title-explore:after {
            width: 100px !important;
            right: 5%;
        }
        .plus-btn {
            right: 8%;
            top: 91%;
            transform: translate(-50%, -50%);
        }
        .followers {
            .dis-cell {
                padding: 20px;
                position: relative;
                h3 {
                    font-family: 'Montserrat-Light';
                    font-size: 24px;
                }
                span {
                    font-family: 'Montserrat-Regular';
                    font-size: 14px;
                }
            }
        }
        .toggleyouKnow {
            width: 197px;
            font-size: 12px;
        }
        .toggleContacts {
            width: 197px;
            font-size: 12px;
        }
        .profile-img {
            width: 85px;
            height: 85px;
        }
        .user-name {
            font-size: 17px;
        }
        .designation {
            line-height: 4px;
            font-size: 12px;
        }
        .listperson {
            top: 88px;
        }
        .r-border:after {
            height: 63px;
        }
        .designation {
            font-size: 12px;
        }
        .follow-btn {
            .button {
                margin-top: 7px;
                min-height: 27px;
                line-height: 10px;
                font-size: 11px;
                padding: 0px 20px;
            }
        }
        .btn-yellow {
            padding: 7px 65px;
            font-size: 14px;
        }
        .social-icon li {
            width: 23% !important;
        }
        .social-icon p {
            margin-right: 50px;
            font-size: 14px;
        }
        .social-icon {
            margin-bottom: 60px;
        }
        .social-iconll {
            text-align: right;
            margin-right: -18px;
            margin-top: 0px;
            li {
                width: 21%;
                display: inline-block;
            }
            p {
                margin-right: 50px;
                margin-top: 30px;
                font-size: 14px;
            }
        }
    }
    
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait) {
        .social-icon li {
            width: 20% !important;
        }
        .social-icon {
            margin-bottom: 60px;
        }
        .social-iconll li {
            width: 19%;
        }
    }