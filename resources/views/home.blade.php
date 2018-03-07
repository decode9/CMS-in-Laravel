@extends('layouts.backend')
<style media="screen">
body{
    font-family: sans-serif !important;
}
#listBalance{
  padding: 0px;
  margin: 0px;
  list-style: none;
  height: 40px;
}
#listBalance li{
  float:left;
  margin: 0 auto;
  padding: 9px 10px;
}
#myChart{
  width: 400px !important;
height: auto !important;
margin: 0 auto !important;
}
/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
    display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

.prev{
  left: 0;
}
/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor:pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade{
  opacity: 1 !important;
}
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>
@section('content')
<div class="col-sm-12" style="text-align:center;">
  <div class="well">
      <h4 style="float:left;">Balance</h4>
      <ul id="listBalance">
      </ul>
  </div>
  <div class="row">
    <div class="col-sm-3">
      <div class="well">
        <h4>Initial Invest</h4>
        <p id="initial"></p>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="well">
        <h4>Total USD / BTC</h4>
        <p>USD: <span id="totalusd"></span> / BTC: <span id="totalbtc"></span></p>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="well">
        <h4>Profit Gain And Loss</h4>
        <p>USD: <span id="profit"></span></p>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="well">
        <h4>% Change</h4>
        <p><span id="percent"></span>%</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <div class="well">
        <h4>Balance Distribution</h4>
        <canvas id="myChart" width="300" height="400"></canvas>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="well">
        <h4>Newsletter</h4>
        <div class="slideshow-container">

        </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">

</script>
@endsection
