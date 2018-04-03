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
  padding: 0px 13px;
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
@if(!(Auth::User()->hasRole('30')))
<div class="row">
  <div class="col-sm-12">
    <div class="panel panel-alternative">
      <div class="panel-heading">
        <h4>Periods</h4>
      </div>
      <div class="panel-body periods text-center">
        <table id="table_period" class="table ">
            <thead class="thead-default">
                <tr style="text-align: center;">
                    <th id="table_period_header_open_date" style="cursor: pointer;text-align: center;">Open Date</th>
                    <th id="table_period_header_open_amount" style="cursor: pointer;text-align: center;">Open Amount</th>
                    <th id="table_period_header_close_date" style="cursor: pointer;text-align: center;">Close Date</th>
                    <th id="table_period_header_close_amount" style="cursor: pointer;text-align: center;">Close Amount</th>
                    <th id="table_period_header_diff_change" style="cursor: pointer;text-align: center;">Diff Change</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th colspan="3" id="period_page">
                        <div class="form-group" style="width:70px;">
                            <select id="result_period_page" class="form-control">
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </th>
                    <th id="table_period_pagination" class="text-right" colspan="4"></th>
                </tr>
            </tfoot>
            <tbody id="table_period_content" style="text-align: center;">
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
@endif

  <div class="row">
    <div class="col-sm-12">
      <div class="panel panel-alternative">
              <div class="panel-heading">
                <div class="col-sm-8">
                  <h4>Historical Chart</h4>
                </div>
                <div class="col-sm-4">
                  <div class="col-sm-12 text-center">
                    <button type="button" class="btn btn-alternative btn-chart" id="daily">Daily</button>
                    <button type="button" class="btn btn-alternative btn-chart" id="weekly">Weekly</button>
                    <button type="button" class="btn btn-alternative btn-chart" id="monthly">Monthly</button>
                  </div>
                </div>
              </div>
              <div class="panel-body" style="height:400px;" >
                <div class="col-sm-12" style="height:300px;">
                  <canvas id="historicalChart" width="600" height="300"></canvas>
                </div>

              </div>
      </div>
    </div>
  </div>
  <div class="row text-center">
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="BTCChart" width="600" height="90"></canvas>
                  <p id="btcAmount"></p>
              </div>
              <div class="panel-footer">
                  <h4>Total BTC</h4>
              </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="totalChart" width="600" height="90"></canvas>
                  <p id="usdAmount"></p>
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
                  <p id="profitAmount"></p>
              </div>
              <div class="panel-footer">
                  <h4>Profit Gain And Loss</h4>
              </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-alternative">
              <div class="panel-body" style="height:150px">
                  <canvas id="initialChart" width="600" height="90"></canvas>
                  <p id="initialAmount"></p>
              </div>
              <div class="panel-footer">
                  <h4>Initial Invest</h4>
              </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-6">

      <div class="col-sm-12" style="padding: 0px;">
        <div class="panel panel-alternative">
                <div class="panel-heading"><h4>My portfolio</h4></div>
                <div class="panel-body myPortfolio">
                </div>
        </div>
      </div>
      <div class="col-sm-12" style="padding: 0px;">
        <div class="panel panel-alternative">
                <div class="panel-heading"><h4>Newsletter</h4></div>
                <div class="panel-body bodyNews">
                  <div class="message-container col-sm-7 text-left">
                  </div>
                  <div class="info-container col-sm-5">
                    <div class="date-container col-sm-12" style="height:50px">

                    </div>
                    <div class="read-container col-sm-12">
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-6">
      <div class="panel panel-alternative">
              <div class="panel-heading"><h4>Balance Distribution</h4></div>
              <div class="panel-body">
                  <div class="col-sm-5 col-md-12 col-lg-5 list-dist">
                      <div class="list-gr">

                      </div>
                  </div>
                  <div class="col-sm-7 col-md-12 col-lg-7" style="height:200px;">
                      <canvas id="myChart"></canvas>
                  </div>

              </div>
      </div>
    </div>
  </div>


<div class="modal  fade" id="newsMod" role="dialog">
<div class="modal-dialog">

  <!-- Modal content-->
  <div class="modal-content modal-alternative">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">&times;</button>
      <h4 class="modal-title"></h4>
    </div>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-alternative" data-dismiss="modal">Close</button>
    </div>
  </div>

</div>

</div>
<script type="text/javascript">

</script>
@endsection
