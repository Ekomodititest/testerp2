function clickPosting(ncounter){
	var x=document.getElementById("pilihstatus").value;
	if (x==0){
		return;
	}
	param="method=POSTING&ncounter="+ncounter;
	tujuan='keu_slave_posting_cashbank.php';  
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
									//document.getElementById('container').innerHTML=con.responseText;
								}
								else {
									//document.getElementById("container").innerHTML=con.responseText;
									alert(con.responseText);
									loadData();
								}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }   

}

function optFilter(){
		var filter=document.getElementById('filter').value;
		document.getElementById('keyword').value='';
		document.getElementById('tglcari').value='';
		
		document.getElementById('keyword').hidden=false;
		document.getElementById('tglcari').hidden=true;
		if(filter=='a.tglTransaksi'){
			document.getElementById('keyword').hidden=true;
			document.getElementById('tglcari').hidden=false;
		}
}	

function loadData(){
		var flag=document.getElementById('flag').value;
		param="method=LOADDATADEPOSIT&flag="+flag;
		tujuan='keu_slave_posting_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
			  if(con.readyState==4)
			  {
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
										document.getElementById('container').innerHTML=con.responseText;
									}
									else {
										document.getElementById("container").innerHTML=con.responseText;
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			  }	
         }   
}

	
function cariData(){
		var flag=document.getElementById('flag').value;
		var filter=document.getElementById('filter').value;
		var keyword=document.getElementById('keyword').value;
		if(filter=='a.tglTransaksi'){
			keyword=document.getElementById('tglcari').value;
		}
		param="method=CARIDATADEPOSIT&flag="+flag+"&filter="+filter+"&keyword="+keyword;
		tujuan='keu_slave_posting_cashbank.php';  
        post_response_text(tujuan, param, respog);
        function respog()
        {
			  if(con.readyState==4)
			  {
					if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
										document.getElementById('container').innerHTML=con.responseText;
									}
									else {
										document.getElementById("container").innerHTML=con.responseText;
									}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
			  }	
         }   
}
