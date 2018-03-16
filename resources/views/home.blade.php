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
  color: black;
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
.btn-group > .btn{
  margin: 0px;
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
    <div class="col-sm-12">
      <div class="panel panel-alternative">
              <div class="panel-heading">
                <div class="col-sm-8">
                  <h4>Historical Profit</h4>
                </div>
                <div class="col-sm-4">
                  <div class="col-sm-12 text-center" style="float:right;">
                    <button type="button" class="btn btn-alternative btn-chart" id="daily">Daily</button>
                    <button type="button" class="btn btn-alternative btn-chart" id="weekly">Weekly</button>
                    <button type="button" class="btn btn-alternative btn-chart" id="monthly">Monthly</button>
                  </div>
                </div>
              </div>
              <div class="panel-body" style="height:300px;">
                  <canvas id="historicalChart" width="600" height="300"></canvas>
              </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="initialChart" width="600" height="90"></canvas>
              </div>
              <div class="panel-footer">
                  <h4>Initial Invest</h4>
              </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="totalChart" width="600" height="90"></canvas>
              </div>
              <div class="panel-footer">
                  <h4>Total USD</h4>
              </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="profitChart" width="600" height="90"></canvas>
              </div>
              <div class="panel-footer">
                  <h4>Profit Gain And Loss</h4>
              </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="BTCChart" width="600" height="90"></canvas>
              </div>
              <div class="panel-footer">
                  <h4>Total BTC</h4>
              </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <div class="panel panel-alternative">
              <div class="panel-heading"><h4>Balance Distribution</h4></div>
              <div class="panel-body">
                <div class="chartContainer" style="height:400px;">
                    <canvas id="myChart"></canvas>
                </div>
              </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="panel panel-alternative">
              <div class="panel-heading"><h4>Newsletter</h4></div>
              <div class="panel-body">
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
