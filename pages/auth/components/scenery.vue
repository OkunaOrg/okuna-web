<template>
    <section class="scenery">
        <div class="absolute cloud_left">
            <ul class="scenery-inline-list">
                <li class="cloud"></li>
                <li class="cloud"></li>
                <li class="cloud"></li>
            </ul>
        </div>

        <div class="absolute cloud_right">
            <ul class="scenery-inline-list">
                <li class="cloud"></li>
                <li class="cloud"></li>
                <li class="cloud"></li>
            </ul>
        </div>

        <!--<span class="absolute sun"></span>-->


        <div class="absolute landscape left_m">
            <span class="grass gl">
                <span class="land_tree leftt-gras">
                <ul class="scenery-inline-list">
                  <li class="t_grass"></li>
                  <li class="t_grass"></li>
                  <li class="t_grass"></li>
                </ul>
                </span>
            </span>

            <span class="absolute tree1"></span>
            <span class="absolute tree2"></span>
        </div>

        <div class="absolute landscape max_right">

            <span class="grass">
                <span class="land_tree">
                    <ul class="scenery-inline-list">
                      <li class="t_grass"></li>
                      <li class="t_grass"></li>
                      <li class="t_grass"></li>
                    </ul>
                </span>
            </span>

            <div class="mountain">
                <div class="r-mountain"></div>
                <ul class="snow scenery-inline-list">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        </div>

        <div class="absolute boat">
            <ul class="scenery-no-bullet">
                <ul class="scenery-no-bullet fume">
                    <li class="fume4"></li>
                    <li class="fume3"></li>
                    <li class="fume2"></li>
                    <li class="fume1"></li>
                </ul>
                <li class="smokestack"></li>
                <li class="white-body">
                    <ul class="windows scenery-inline-list">
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                    </ul>
                </li>
                <li class="boat-body"></li>
            </ul>
        </div>

        <div class="absolute dark-back"></div>

        <div class="absolute plane">
            <ul class="scenery-no-bullet">
                <li class="plane-body">
                    <ul class="windows scenery-inline-list">
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                    </ul>
                </li>

                <li class="wing1"></li>
                <li class="wing1 flipwing"></li>
                <li class="absolute teal"></li>
            </ul>
        </div>

        <div class="absolute sea">
            <span class="wave1"></span>
            <span class="wave2"></span>
            <span class="wave3"></span>
            <span class="wave4"></span>
        </div>

    </section>
</template>

<style lang="scss">
    $sky-color: white;

    ul.scenery-no-bullet {
        list-style: none;
    }

    .scenery-inline-list {
        margin: 0 auto 1.0625rem auto;
        margin-left: -1.375rem;
        margin-right: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
    }

    .scenery-inline-list > li {
        list-style: none;
        float: left;
        margin-left: 1.375rem;
        display: block;
    }

    .scenery-inline-list > li > * {
        display: block;
    }

    .scenery {
        background-color: #0c3545;
        height: 100%;
    }

    .absolute {
        position: absolute;
    }

    .cloud_left {
        width: 150px;
        height: 50px;
        overflow: hidden;
        top: 60px;
        left: 60px;
        z-index: 999;
    }

    .cloud {
        background: white;
        border-radius: 50%;
        display: block;
    }

    .cloud_left ul, .land_tree ul {
        margin: 0px
    }

    .cloud_left li:nth-child(1) {
        width: 50px;
        height: 50px;
        margin: 30px 0px 0px 0px;
    }

    .cloud_left li:nth-child(2) {
        width: 70px;
        height: 70px;
        margin: 0px 0px 0px -10px;
    }

    .cloud_left li:nth-child(3) {
        width: 40px;
        height: 40px;
        margin: 23px 0px 0px -7px;
    }

    .cloud_right {
        width: 150px;
        height: 50px;
        overflow: hidden;
        top: 100px;
        right: 240px;
        z-index: 2;
    }

    .cloud_right ul, .land_tree ul {
        margin: 0px
    }

    .cloud_right li:nth-child(1) {
        width: 40px;
        height: 40px;
        margin: 36px 0px 0px 1px;
    }

    .cloud_right li:nth-child(2) {
        width: 70px;
        height: 70px;
        margin: 0px 0px 0px -11px;
    }

    .cloud_right li:nth-child(3) {
        width: 50px;
        height: 50px;
        margin: 31px 0px 0px -13px;
    }

    .sea {
        width: 100%;
        height: 30px;
        background: #2a94d6;
        bottom: 7px;
    }

    .sea:after {
        content: '';
        position: absolute;
        height: 12px;
        background: #1D7FBB;
        bottom: -10px;
        width: 100%;
        left: 0px;
    }

    .sea span {
        background-color: #8bd9f5;
        position: absolute;
    }

    .wave1 {
        width: 100px;
        height: 3px;
        left: 420px;
        top: 10px;
    }

    .wave2 {
        width: 100px;
        height: 3px;
        left: 433px;
        top: 13px;
    }

    .wave3 {
        width: 50px;
        height: 3px;
        right: 460px;
        top: 15px;
    }

    .wave4 {
        width: 50px;
        height: 3px;
        right: 467px;
        top: 18px;
    }

    .landscape {
        bottom: 15px;
        width: 400px;
        height: 170px;
        z-index: 3;
    }

    .max_right {
        right: 0px
    }

    .max_right .grass {
        left: 20px;
    }

    .max_right .grass:after {
        right: 0px;
        bottom: 40px;
    }

    .max_right .land_tree {
        bottom: 40px;
        left: 30px;
    }

    .grass {
        width: 100%;
        height: 40px;
        left: -20px;
        border-radius: 50px;
        position: absolute;
        background: #126c48;
        bottom: 0px;
        display: block;
        z-index: 1
    }

    .grass:after {
        position: absolute;
        content: '';
        width: 50%;
        height: 40px;
        border-radius: 50px;
        background: #219065;
        bottom: 36px;
    }

    .leftt-gras {
        right: 40px !important;
    }

    .land_tree {
        width: auto;
        height: 50px;
        display: block;
        position: absolute;
        bottom: 40px;
        overflow: hidden;
    }

    .land_tree li {
        border-radius: 50%;
    }

    .land_tree li:nth-child(1) {
        width: 40px;
        height: 40px;
        margin: 30px 0px 0px 0px;
        background: #219065;
    }

    .land_tree li:nth-child(2) {
        width: 60px;
        height: 60px;
        margin: 0px 0px 0px -10px;
        background: #126c48;
    }

    .land_tree li:nth-child(3) {
        width: 50px;
        height: 50px;
        margin: 23px 0px 0px -7px;
        background: #219065;
    }

    .tree1 {
        background: #21904b;
        border-radius: 50%;
        width: 65px;
        height: 65px;
        border-right: 5px solid #157C3C;
        border-bottom: 5px solid #157C3C;
        z-index: -1;
        right: 100px;
        bottom: 120px;
    }

    .tree1:after {
        position: absolute;
        content: '';
        width: 2px;
        height: 50px;
        background: #FFF;
        margin: 30px 0px 0px 3px;
        top: 35px;
    }

    .tree2 {
        background: #26a76f;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        border-right: 5px solid #17955e;
        border-bottom: 5px solid #17955e;
        z-index: -1;
        right: 150px;
        bottom: 80px;
    }

    .tree2:after {
        position: absolute;
        content: '';
        width: 2px;
        height: 50px;
        background: #FFF;
        margin: 23px 10px 0px 0px;
        top: 27px;
    }

    .boat {
        bottom: 10px;
        z-index: 20;
        -webkit-animation: boatanimate 30s linear infinite;
        -moz-animation: boatanimate 30s linear infinite;
        -o-animation: boatanimate 30s linear infinite;
        animation: boatanimate 30s linear infinite;
    }

    @-webkit-keyframes boatanimate {
        0% {
            right: 250px;
        }
        100% {
            right: 1040px;
        }
    }

    @-moz-keyframes boatanimate {
        0% {
            right: 250px;
        }
        100% {
            right: 1040px;
        }
    }

    @-o-keyframes boatanimate {
        0% {
            right: 250px;
        }
        100% {
            right: 1040px;
        }
    }

    @keyframes boatanimate {
        0% {
            right: 250px;
        }
        100% {
            right: 1040px;
        }
    }

    .boat-body {
        width: 100px;
        height: 20px;
        background: #e25c45;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 20px;
    }

    .white-body {
        width: 65px;
        height: 16px;
        background: #FFF;
        margin: 0px 13px;
        border-top-left-radius: 20px;
    }

    .windows {
        margin: 0px 12px !important;
    }

    .boat .circle {
        background: #a18e6e;
        width: 7px;
        height: 7px;
        margin: 5px 3px;
        border-radius: 50%;
    }

    .smokestack {
        width: 10px;
        height: 17px;
        background: #a18e6e;
        bottom: 30px;
        margin-left: 45px;
    }

    .plane {
        top: 40%;
        left: 80px;
        -webkit-animation: planeanimate 30s linear infinite;
        -moz-animation: planeanimate 30s linear infinite;
        -o-animation: planeanimate 30s linear infinite;
        animation: planeanimate 30s linear infinite;
    }

    @-webkit-keyframes planeanimate {
        0% {
            left: -10%;
        }
        100% {
            left: 110%;
        }
    }

    @-moz-keyframes planeanimate {
        0% {
            left: -10%;
        }
        100% {
            left: 110%;
        }
    }

    @-o-keyframes planeanimate {
        0% {
            left: -10%;
        }
        100% {
            left: 110%;
        }
    }

    @keyframes planeanimate {
        0% {
            left: -10%;
        }
        100% {
            left: 110%;
        }
    }

    .plane-body {
        width: 90px;
        height: 15px;
        background: #FFF;
        border-bottom: 4px solid #ECECEC;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .plane .circle {
        width: 5px;
        height: 5px;
        background: #E25C45;
        border-radius: 50%;
        margin: 4px 5px 0 0;
        float: right;
    }

    .wing1 {
        background: #0C3545;
        width: 15px;
        height: 20px;
        float: right;
        bottom: -17px;
        position: absolute;
        right: 35px;
    }

    .wing1:after {
        position: absolute;
        content: '';
        // background: #0C3545;
        width: 7px;
        height: 28px;
        right: -3px;
        -webkit-transform: rotate(14deg);
        -moz-transform: rotate(14deg);
        -o-transform: rotate(14deg);
        transform: rotate(14deg);
        top: 3px;
    }

    .flipwing {
        -webkit-transform: scaleY(-1);
        -moz-transform: scaleY(-1);
        -o-transform: scaleY(-1);
        transform: scaleY(-1);
        bottom: 15px;
        height: 16px;
        width: 14px;
    }

    .teal {
        background: #0C3545;
        width: 16px;
        height: 23px;
        bottom: 15px;
    }

    .teal:after {
        position: absolute;
        content: '';
        // background: #0C3545;
        width: 7px;
        height: 28px;
        right: -3px;
        -webkit-transform: rotate(-16deg);
        -moz-transform: rotate(-16deg);
        -o-transform: rotate(-16deg);
        transform: rotate(-16deg);
        top: -7px;
    }

    .sun {
        width: 48px;
        height: 48px;
        background: #fab92d;
        border-radius: 50%;
        border-bottom: 5px solid #eaab23;
        border-right: 5px solid #eaab23;
        right: 352px;
        top: 90px;
        z-index: 1;
    }

    .scenery h1 {
        margin-top: 143px;
        margin-left: 110px;
        color: #FFF;
        font-size: 30px;
    }

    .btn-round {
        padding: 5px 16px;
        border: 1px solid #0A2B38;
        border-radius: 50px;
        transition: 0.2s ease;
    }

    .contact-btn {
        color: #92ADB8;
        font-size: 17px;
        top: 50%;
        right: 45%;
        position: absolute;
        z-index: 99;
        text-decoration: none;
    }

    .contact-btn:hover {
        background: #219065;
        color: white
    }

    .relative {
        position: relative;
    }

    .fume {
        margin: 0px;
    }

    .fume li {
        background-color: #eaeaea;
        border-radius: 50%;
    }

    .fume1 {
        width: 7px;
        height: 7px;
        margin-left: 48px;
        -webkit-animation: smokeup 2.0s linear infinite;
        -moz-animation: smokeup 2.0s linear infinite;
        -o-animation: smokeup 2.0s linear infinite;
        animation: smokeup 2.0s linear infinite;
    }

    .fume2 {
        width: 9px;
        height: 9px;
        margin-left: 38px;
        -webkit-animation: smokeup 2.1s linear infinite;
        -moz-animation: smokeup 2.1s linear infinite;
        -o-animation: smokeup 2.1s linear infinite;
        animation: smokeup 2.1s linear infinite;
    }

    .fume3 {
        width: 12px;
        height: 12px;
        margin-left: 48px;
        -webkit-animation: smokeup 2.2s linear infinite;
        -moz-animation: smokeup 2.2s linear infinite;
        -o-animation: smokeup 2.2s linear infinite;
        animation: smokeup 2.2s linear infinite;
    }

    .fume4 {
        width: 15px;
        height: 15px;
        margin-left: 38px;
        -webkit-animation: smokeup 2.3s linear infinite;
        -moz-animation: smokeup 2.3s linear infinite;
        -o-animation: smokeup 2.3s linear infinite;
        animation: smokeup 2.3s linear infinite;
    }

    @-webkit-keyframes smokeup {
        0% {
            margin-bottom: -3px;
            opacity: 1
        }
        80% {
            margin-bottom: 7px;
            opacity: 0
        }
        100% {
            margin-bottom: 7px;
            opacity: 0
        }
    }

    @-moz-keyframes smokeup {
        0% {
            margin-bottom: -3px;
            opacity: 1
        }
        80% {
            margin-bottom: 7px;
            opacity: 0
        }
        100% {
            margin-bottom: 7px;
            opacity: 0
        }
    }

    @-o-keyframes smokeup {
        0% {
            margin-bottom: -3px;
            opacity: 1
        }
        80% {
            margin-bottom: 7px;
            opacity: 0
        }
        100% {
            margin-bottom: 7px;
            opacity: 0
        }
    }

    @keyframes smokeup {
        0% {
            margin-bottom: -3px;
            opacity: 1
        }
        80% {
            margin-bottom: 7px;
            opacity: 0
        }
        100% {
            margin-bottom: 7px;
            opacity: 0
        }
    }

    .r-mountain {
        border-left: 110px rgba(0, 0, 0, 0) solid;
        border-right: 110px rgba(0, 0, 0, 0) solid;
        border-bottom: 170px #B3A385 solid;
        position: absolute;
        right: 80px;
        bottom: 40px;
    }

    .r-mountain:before {
        content: '';
        position: absolute;
        left: 0px;
        border-right: 110px rgba(0, 0, 0, 0) solid;
        border-bottom: 170px #A18E6E solid;
    }

    .r-mountain:after {
        content: '';
        position: absolute;
        left: -39px;
        border-left: 39px rgba(0, 0, 0, 0) solid;
        border-right: 39px rgba(0, 0, 0, 0) solid;
        border-bottom: 60px #FFF solid;
    }

    .snow {
        margin: 0px;
        position: absolute;
        top: 9px;
        right: 153px;
    }

    .snow li {
        background: #FFF;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 0px;
        display: inline-block;
    }

    .gl:after {
        position: absolute;
        content: '';
        width: 50%;
        height: 40px;
        border-radius: 50px;
        background: #219065;
        bottom: 36px;
        left: 0px;
    }

    .left_m {
        left: 0px;
    }

    @media (min-width: 420px) and (max-width: 799px) {
        .max_right {
            right: -80px;
        }
        .left_m {
            display: none
        }
        .cloud_left {
            display: none;
        }
    }

    @media (min-width: 800px) and (max-width: 1024px) {
        .max_right {
            right: -80px;
        }
        .left_m {
            left: -80px;
        }
    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkAuthLoginScenery"
    })
    export default class extends Vue {
    }
</script>