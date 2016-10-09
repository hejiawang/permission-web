<%
    String path1 = request.getContextPath();
    String basePath1 = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path1 + "/";
%>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<!-- CSS Start  -->
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="<%= basePath1%>resources/css/bootstrap.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/font-awesome.css" />

		<!-- page specific plugin styles -->
		<link rel="stylesheet" href="<%= basePath1%>resources/css/jquery-ui.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/prettify.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/jquery-ui.custom.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/chosen.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/datepicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/bootstrap-timepicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/daterangepicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/bootstrap-datetimepicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/colorpicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/jquery.gritter.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/select2.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/ui.jqgrid.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/dropzone.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/fullcalendar.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/colorbox.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/datepicker.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/bootstrap-editable.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<!-- jsTree css-->
		<link rel="stylesheet" href="<%= basePath1%>resources/js/dist/themes/default/style.min.css" />
     	
     	<!-- text fonts -->
		<link rel="stylesheet" href="<%= basePath1%>resources/css/openSans.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="<%= basePath1%>resources/css/ace.css" id="main-ace-style" />

		<!--[if lte IE 9]>
			<link rel="stylesheet" href="resources/css/ace-part2.css" />
		<![endif]-->
		<link rel="stylesheet" href="<%= basePath1%>resources/css/ace-skins.css" />
		<link rel="stylesheet" href="<%= basePath1%>resources/css/ace-rtl.css" />

		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="resources/css/ace-ie.css" />
		<![endif]-->

		<!-- inline styles related to this page -->
		<!-- CSS END  -->
		
		<!-- JavaScript Start  -->
		<!-- ace settings handler -->
		<script src="<%= basePath1%>resources/js/ace-extra.js"></script>

		<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

		<!--[if lte IE 8]>
		<script src="<%= basePath1%>resources/js/html5shiv.js"></script>
		<script src="<%= basePath1%>resources/js/respond.js"></script>
		<![endif]-->
		
		
		<!-- basic scripts -->

		<!--[if !IE]><!-->
			<script src="resources/js/jquery/jquery-2.1.1.js"></script>
			<script src="resources/js/layer/layer.js"></script>
		<!--<![endif]-->

		<!--[if IE]>
			<script src="resources/js/jquery/jquery-1.11.1.js"></script>
			<script src="resources/js/layer/layer.js"></script>
		<![endif]-->
		
		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='<%= basePath1%>resources/js/jquery.js'>"+"<"+"/script>");
		</script>
		<!-- <![endif]-->

		<!--[if IE]>
		<script type="text/javascript">
		 window.jQuery || document.write("<script src='resources/js/jquery1x.js'>"+"<"+"/script>");
		</script>
		<![endif]-->
		
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='resources/js/jquery.mobile.custom.js'>"+"<"+"/script>");
		</script>
		<script src="<%= basePath1%>resources/js/bootstrap.js"></script>



        <!-- jsTree js -->
        <script src="<%= basePath1%>resources/js/dist/jstree.js"></script> 
         
		<!-- page specific plugin scripts -->
		<script src="<%= basePath1%>resources/js/prettify.js"></script>
		<script src="<%= basePath1%>resources/js/fuelux/data/fuelux.tree-sample-demo-data.js"></script>
		<script src="<%= basePath1%>resources/js/fuelux/fuelux.tree.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.nestable.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.dataTables.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.dataTables.bootstrap.js"></script>
		<!--[if lte IE 8]>
		<script src="<%= basePath1%>resources/js/excanvas.js"></script>
		<![endif]-->
		<script src="<%= basePath1%>resources/js/jquery-ui.js"></script>
		<script src="<%= basePath1%>resources/js/jquery-ui.custom.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.ui.touch-punch.js"></script>
		<script src="<%= basePath1%>resources/js/chosen.jquery.js"></script>
		<script src="<%= basePath1%>resources/js/bootbox.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.easypiechart.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.gritter.js"></script>
		<script src="<%= basePath1%>resources/js/spin.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.sparkline.js"></script>
		<script src="<%= basePath1%>resources/js/flot/jquery.flot.js"></script>
		<script src="<%= basePath1%>resources/js/flot/jquery.flot.pie.js"></script>
		<script src="<%= basePath1%>resources/js/flot/jquery.flot.resize.js"></script>
		<script src="<%= basePath1%>resources/js/jqGrid/jquery.jqGrid.js"></script>
		<script src="<%= basePath1%>resources/js/jqGrid/i18n/grid.locale-cn.js"></script>
		
		<script src="<%= basePath1%>resources/js/fuelux/fuelux.spinner.js"></script>
		<script src="<%= basePath1%>resources/js/date-time/bootstrap-datepicker.js"></script>
		<script src="<%= basePath1%>resources/js/date-time/bootstrap-timepicker.js"></script>
		<script src="<%= basePath1%>resources/js/date-time/moment.js"></script>
		<script src="<%= basePath1%>resources/js/date-time/daterangepicker.js"></script>
		<script src="<%= basePath1%>resources/js/date-time/bootstrap-datetimepicker.js"></script>
		<script src="<%= basePath1%>resources/js/bootstrap-colorpicker.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.knob.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.autosize.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.inputlimiter.1.3.1.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.maskedinput.js"></script>
		<script src="<%= basePath1%>resources/js/bootstrap-tag.js"></script>
		<script src="<%= basePath1%>resources/js/typeahead.jquery.js"></script>
		
		<script src="<%= basePath1%>resources/js/fuelux/fuelux.wizard.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.validate.js"></script>
		<script src="<%= basePath1%>resources/js/additional-methods.js"></script>
		<script src="<%= basePath1%>resources/js/select2.js"></script>
		
		<script src="<%= basePath1%>resources/js/markdown/markdown.js"></script>
		<script src="<%= basePath1%>resources/js/markdown/bootstrap-markdown.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.hotkeys.js"></script>
		<script src="<%= basePath1%>resources/js/bootstrap-wysiwyg.js"></script>
		<script src="<%= basePath1%>resources/js/dropzone.js"></script>
		<script src="<%= basePath1%>resources/js/fullcalendar.js"></script>
		<script src="<%= basePath1%>resources/js/jquery.colorbox.js"></script>
		<script src="<%= basePath1%>resources/js/x-editable/bootstrap-editable.js"></script>
		<script src="<%= basePath1%>resources/js/x-editable/ace-editable.js"></script>
		<!-- ace scripts -->
		<script type="text/javascript" src="<%= basePath1%>resources/js/ajaxfileupload.js"></script>
		<script src="<%= basePath1%>resources/js/ace-elements.js"></script>
		<script src="<%= basePath1%>resources/js/ace.js"></script>
		<script type="text/javascript" src="<%= basePath1%>resources/zTree/js/jquery.ztree.core-3.5.js"></script>
		<script type="text/javascript" src="<%= basePath1%>resources/zTree/js/jquery.ztree.excheck-3.5.js"></script>
		<script type="text/javascript" src="<%= basePath1%>resources/js/common.js"></script>
		
		<script src="<%= basePath1%>resources/js/jplaceholder.js"></script>
		<!-- inline scripts related to this page -->
		
		<script type="text/javascript">
			UrlParm = function() { 
				var data, index;
				(function init() {
					data = [];
					index = {};
					var u = window.location.search.substr(1);
					if (u != '') {
						var parms = decodeURIComponent(u).split('&');
						for (var i = 0, len = parms.length; i < len; i++) {
							if (parms[i] != '') {
								var p = parms[i].split("=");
								if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=  
									data.push([ '' ]);
									index[p[0]] = data.length - 1;
								} else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c | =  
									data[0] = [ p[1] ];
								} else if (typeof (index[p[0]]) == 'undefined') { // c=aaa  
									data.push([ p[1] ]);
									index[p[0]] = data.length - 1;
								} else {// c=aaa  
									data[index[p[0]]].push(p[1]);
								}
							}
						}
					}
				})();
				return {
					parm : function(o) { 
						try {
							return (typeof (o) == 'number' ? data[o][0]
									: data[index[o]][0]);
						} catch (e) {
						}
					},
					parmValues : function(o) {  
						try {
							return (typeof (o) == 'number' ? data[o] : data[index[o]]);
						} catch (e) {
						}
					},
					hasParm : function(parmName) {
						return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined'
								: false;
					},
					parmMap : function() {
						var map = {};
						try {
							for ( var p in index) {
								map[p] = data[index[p]];
							}
						} catch (e) {
						}
						return map;
					}
				}
			}();
			
			 $(document).unbind('keydown').bind('keydown', function (event) {
				    var doPrevent = false;
				    if (event.keyCode === 8) {
				        var d = event.srcElement || event.target;
				        if ((d.tagName.toUpperCase() === 'INPUT' && 
				             (
				                 d.type.toUpperCase() === 'TEXT' ||
				                 d.type.toUpperCase() === 'PASSWORD' || 
				                 d.type.toUpperCase() === 'FILE' || 
				                 d.type.toUpperCase() === 'EMAIL' || 
				                 d.type.toUpperCase() === 'SEARCH' || 
				                 d.type.toUpperCase() === 'TEL' || 
				                 d.type.toUpperCase() === 'DATE' )
				             ) || 
				             d.tagName.toUpperCase() === 'TEXTAREA') {
				            doPrevent = d.readOnly || d.disabled;
				        }
				        else {
				            doPrevent = true;
				        }
				    }

				    if (doPrevent) {
				        event.preventDefault();
				    }
			});
		</script>
		<!-- JavaScript End  -->