

function cariList(num){
	filter=document.getElementById('filter').options[document.getElementById('filter').selectedIndex].value;
	keyword=document.getElementById('keyword').value;
	tglcari=document.getElementById('tglcari').value;
	param='method=showHeader';
		
	param+='&page='+num+'&filter='+filter+'&keyword='+keyword+'&tglcari='+tglcari;
	
	tujuan = 'keu_slave_posting_tagihan_masuk.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							document.getElementById('container').innerHTML=con.responseText;
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
			}
	}	
}


function loadData(){
        param="method=showHeader&filter=&keyword=";
        tujuan = 'keu_slave_posting_tagihan_masuk.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
								
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }
}

function previewDetail(nocnt,noinv,ev)
{
	showDetail(nocnt,noinv,ev);
	rnocnt=nocnt;
	param='rnocnt='+rnocnt+'&method=getDetail';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								document.getElementById('contDetail').innerHTML=con.responseText;
						}
						else {
								//alert(con.responseText);
								document.getElementById('contDetail').innerHTML=con.responseText;
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }  

}

function showDetail(nocnt,noinv,ev)
{	
	title=document.getElementById('invdt').value;
	content="<fieldset><legend>"+noinv+"</legend><div id=contDetail style='overflow:auto; width:750px; height:350px;' ></div></fieldset><input type=hidden id=datcnt name=datcnt value="+noinv+" />";
	width='800';
	height='500';
	showDialog1(title,content,width,height,ev);	
}

//update status transaksi 
function UpdateStatus(id,nocounter){
	busy_on();
	var mystatus = document.getElementById('statustrans_'+id).options[document.getElementById('statustrans_'+id).selectedIndex].value;
	var method = 'updateStatus';
	
	param='id='+id+'&status='+mystatus+'&nocounter='+nocounter+'&method='+method+'&bank=&dok=&transno=&vendor=';
	tujuan='keu_slave_posting_tagihan_masuk.php';

	post_response_text(tujuan, param, respog);

	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					//var a=con.responseText.split("|");
					//alert(a[0]);
					alert(con.responseText);
					loadData();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}

