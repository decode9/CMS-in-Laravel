@extends('layouts.frontend')
@section('content')
    <div class="firstBanner">
        <img src="{{url("/")}}/img/krypto.png" width="auto" height="auto" alt="">
    </div>
    <div class="secondBanner parallax">
        <div class="secondContainer">
            <h2>YOUR PARTNER TO THE NEW WORLD OF INVESTING</h2>
            <p>Trust. Innovation. Technology.</p>
        </div>
    </div>
    <div class="thirdBanner">
        <div class="thirdContainer">
            <img src="{{url('/')}}/img/stats.webp" width="auto"  height="auto" alt=""/>
            <div class="textBox">
                <h2>OUR STORY</h2>
                <p>Krypto is a company dedicated to the technical and fundamental analysis of virtual currencies to generate high yield performance.</p>
                <ul>
                    <li>We aim to be the stepping stone for capital markets into the crypto currency world</li>
                    <li>We see ourselves in the future as a major choice in local and international markets</li>
                    <li>We are a company that promotes trust, innovation and technology</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="fourthContainer">
        <h2>Contact</h2>
        <div class="formContact">
            <form class="contactForm" method="post">
                {{ csrf_field() }}
                <input id="name" type="text" name="name" value="" placeholder="Name" required>
                <input id="email" type="text" name="email" value="" placeholder="Email" required>
                <input id="phone" type="text" name="phone" value="" placeholder="Phone" required>
                <input id="address" type="text" name="address" value="" placeholder="Address" required>
                <input id="subject" type="text" name="subject" value="" placeholder="Subject" required>
                <textarea id="message" name="message" rows="5" placeholder="Message" required></textarea>
            </form>
            <button type="button" name="send" id="SendContact">Send</button>
        </div>
        <div class="response">
            <p id="success" style="display: none;" >Your message as been send, please wait and our personal contact you.</p>
            <p id="error" style="display: none;">Your message not been send, please provide all the information.</p>
        </div>
    </div>
@endsection
