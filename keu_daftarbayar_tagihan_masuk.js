

function cariList(num){
	filter=document.getElementById('filter').options[document.getElementById('filter').selectedIndex].value;
	keyword=document.getElementById('keyword').value;
	tglcari=document.getElementById('tglcari').value;
	param='method=showHeader';
		
	param+='&page='+num+'&filter='+filter+'&keyword='+keyword+'&tglcari='+tglcari;
	
	tujuan = 'keu_slave_daftarbayar_tagihan_masuk.php';
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
        tujuan = 'keu_slave_daftarbayar_tagihan_masuk.php';
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

function pPDF(evt){
    pos = new Array();
    pos = getMouseP(evt);
	win="<img src=images/closebig.gif align=right onclick=hideById('pdf'); title='Close detail' class=closebtn onmouseover=\"this.src='images/closebigon.gif';\" onmouseout=\"this.src='images/closebig.gif';\" ><br><br>";
	//win+="<iframe height=450px width=100%  frameborder=0 src='sdm_slavePrintDaftarBayarPDF.php?periode="+periode+"&tipe="+tipe+"&username="+username+"&issbns="+issbns+"&sandibank="+snbk+"&jenisbiaya="+jnby+"'></iframe>";
	win+="<iframe height=450px width=850px  frameborder=0 src='keu_slavePrintDaftarBayarPDF.php'></iframe>";
    document.getElementById('pdf').innerHTML = win;
    document.getElementById('pdf').style.top = pos[1] + 'px';
    document.getElementById('pdf').style.left = '75px';
    document.getElementById('pdf').style.display = '';	
	document.getElementById('pdf').style.zIndex = '100';	
}

//update status transaksi 
function UpdateStatus(id,nocounter,noakunbank){
	busy_on();
	var mystatus = document.getElementById('statusbayar_'+id).options[document.getElementById('statusbayar_'+id).selectedIndex].value;
	var totalbayar = remove_comma(document.getElementById('bayar_'+id));
	var method = 'updateStatus';
	
	param='id='+id+'&status='+mystatus+'&nocounter='+nocounter+'&noakunbank='+noakunbank+'&bayar='+totalbayar+'&method='+method;
	tujuan='keu_slave_daftarbayar_tagihan_masuk.php';
	post_response_text(tujuan, param, respog);

	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					var a=con.responseText.split("|");
					alert(a[0]);
					loadData();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}

//update akun bank
function UpdateBank(id,nocounter){
	busy_on();
	var noakunbank = document.getElementById('akunbank_'+id).options[document.getElementById('akunbank_'+id).selectedIndex].value;
	
	var method = 'updateBank';
	
	param='id='+id+'&noakunbank='+noakunbank+'&nocounter='+nocounter+'&method='+method;
	tujuan='keu_slave_daftarbayar_tagihan_masuk.php';
	post_response_text(tujuan, param, respog);

	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					var a=con.responseText.split("|");
					alert(a[0]);
					loadData();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}

