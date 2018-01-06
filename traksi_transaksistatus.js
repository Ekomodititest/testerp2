function ubahstatus(reffno,row){
	if (!confirm("Update status?")){
		return;
	}
	var xdetailstatus=document.getElementById("detailstatus_"+row).value;
	param="method=SETSTATUS&reffno="+reffno+"&detailstatus="+xdetailstatus;
	tujuan='traksi_slave_transaksistatus.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
								}
								else {
									alert(con.responseText);
									tarikdetail();
									//document.getElementById("pilihjenis").innerHTML=con.responseText;
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   
}
function pilihJeniskegiatan(){
	document.getElementById("detail").style.display='none';
	var kelompok=document.getElementById("pilihgroup").value;
	param="method=GETJENISTRX&kelompok="+kelompok;
	tujuan='traksi_slave_transaksistatus.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
								}
								else {
									document.getElementById("pilihjenis").innerHTML=con.responseText;
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   
}

function detail(){
	var pilihjenis=document.getElementById("pilihjenis").value;
	if (pilihjenis==""){
		document.getElementById("detail").style.display='none';		
	}else{
		document.getElementById("detail").style.display='';
	}
	var kodeorg=document.getElementById("pilihorg").value;
	var group=document.getElementById("pilihgroup").value;
	var jenis=document.getElementById("pilihjenis").value;
	param="method=AMBILTRX&group="+group;
	tujuan='traksi_slave_transaksistatus.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
								}
								else {
									document.getElementById("isiDetail").innerHTML=con.responseText;
									tarikdetail();
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   
	
}


function tarikdetail(){
	var kodeorg=document.getElementById("pilihorg").value;
	var group=document.getElementById("pilihgroup").value;
	var kegiatan=document.getElementById("pilihjenis").value;
	var xstatus=document.getElementById("pilihstatus").value;
	
	param="method=ISITRX&kodeorg="+kodeorg+"&group="+group+"&kegiatan="+kegiatan+"&status="+xstatus;
	tujuan='traksi_slave_transaksistatus.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
								}
								else {
									document.getElementById("loaddetail").innerHTML=con.responseText;
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   
	
}
