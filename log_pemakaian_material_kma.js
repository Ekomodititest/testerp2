// GET FUNCTION //
function GetLokasi(){
	Method = 'GetLokasi';
	perusahaan = document.getElementById('perusahaan').options[document.getElementById('perusahaan').selectedIndex].value;
	
	param ='method='+Method+'&perusahaan='+perusahaan;
	tujuan='log_slave_get_pemakaian_material_kma.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('lokasi').innerHTML=con.responseText;
					showById('buttoncari');
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}
}
function DisplayList(){
	Method = 'LoadData';
	perusahaan = document.getElementById('perusahaan').options[document.getElementById('perusahaan').selectedIndex].value;
	lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	tanggalawal = trim(document.getElementById('tanggalawal').value);
	tanggalakhir = trim(document.getElementById('tanggalakhir').value);
	tipeoperasional  = document.getElementById('tipeoperasional').options[document.getElementById('tipeoperasional').selectedIndex].value;
	oms  = document.getElementById('oms').options[document.getElementById('oms').selectedIndex].value;
	
	if(perusahaan == '' || perusahaan == null){
		alert('Perusahaan harus diisi.');
		return
	}
	if(lokasi == '' || lokasi == null){
		alert('Lokasi harus diisi.');
		return
	}
	if(tanggalawal == '' || tanggalawal == null){
		alert('Tanggal harus diisi.');
		return
	}
	if(tanggalakhir == '' || tanggalakhir == null){
		alert('Tanggal harus diisi.');
		return
	}
	if(tipeoperasional == '' || tipeoperasional == null){
		alert('Tipe Operasional harus diisi.');
		return
	}
	if(oms == '' || oms == null){
		alert('OMS harus diisi.');
		return
	}
	
	param ='method='+Method+'&perusahaan='+perusahaan+'&lokasi='+lokasi+'&tipeoperasional='+tipeoperasional;
	param+='&tanggalawal='+tanggalawal+'&tanggalakhir='+tanggalakhir+'&oms='+oms;
	
	tujuan='log_slave_get_pemakaian_material_kma.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('ListContainer').innerHTML=con.responseText;
					document.getElementById('ViewListHeader').style.display='block';
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}          
}
function DownloadExcel(ev,tujuan){
	Method = 'DownloadExcel';
	perusahaan = document.getElementById('perusahaan').options[document.getElementById('perusahaan').selectedIndex].value;
	perusahaanname = document.getElementById('perusahaan').options[document.getElementById('perusahaan').selectedIndex].text;
	lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	lokasiname = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].text;
	tanggalawal = trim(document.getElementById('tanggalawal').value);
	tanggalakhir = trim(document.getElementById('tanggalakhir').value);
	tipeoperasional  = document.getElementById('tipeoperasional').options[document.getElementById('tipeoperasional').selectedIndex].value;
	tipeoperasionalname  = document.getElementById('tipeoperasional').options[document.getElementById('tipeoperasional').selectedIndex].text;
	oms  = document.getElementById('oms').options[document.getElementById('oms').selectedIndex].value;
	omsname  = document.getElementById('oms').options[document.getElementById('oms').selectedIndex].text;
	
	if(perusahaan == '' || perusahaan == null){
		alert('Perusahaan harus diisi.');
		return
	}
	if(lokasi == '' || lokasi == null){
		alert('Lokasi harus diisi.');
		return
	}
	if(tanggalawal == '' || tanggalawal == null){
		alert('Tanggal harus diisi.');
		return
	}
	if(tanggalakhir == '' || tanggalakhir == null){
		alert('Tanggal harus diisi.');
		return
	}
	if(tipeoperasional == '' || tipeoperasional == null){
		alert('Tipe Operasional harus diisi.');
		return
	}
	if(oms == '' || oms == null){
		alert('OMS harus diisi.');
		return
	}
	
	param ='method='+Method+'&perusahaan='+perusahaan+'&lokasi='+lokasi+'&tipeoperasional='+tipeoperasional;
	param+='&tanggalawal='+tanggalawal+'&tanggalakhir='+tanggalakhir+'&oms='+oms;
	param+='&perusahaanname='+perusahaanname+'&lokasiname='+lokasiname+'&tipeoperasionalname='+tipeoperasionalname+'&omsname='+omsname;
	
	judul='Report Ms.Excel';
	printFile(param,tujuan,judul,ev)	
}

// VIEW FUNCTION //
function PopUpSearchItem(title, method, ev){
	content= "<div>";
	content+="<fieldset>"+title+" <input type=text id=textsearch class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=CariPopUpSearchItem('"+method+"')>Cari</button></fieldset>";
	content+="<div id=containeritem style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	title=title;
	width='600';
	height='440';
	showDialog1(title,content,width,height,ev);
}
function CariPopUpSearchItem(method){
	textsearch = document.getElementById('textsearch').value;
	
	param  = 'method='+method+'&textsearch='+textsearch;
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('containeritem').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}
function SetNoTutupPaksaPR(No){
	notutuppaksa = document.getElementById('notutuppaksa_'+No).value;
	document.getElementById('notutuppaksa').value = notutuppaksa;
	closeDialog();
}
function CariSO(title,ev){
	method  = 'GetNoSO';
	noso 	= '';
	unitDt	= trim(document.getElementById('lokasi').value);
	gudang	= trim(document.getElementById('gudang').value);
	periode = trim(document.getElementById('periode').value);
	
	param='noso='+noso+'&unitDt='+unitDt+'&gudang='+gudang+'&periode='+periode+'&method='+method;
	tujuan = 'log_slave_get_stock_opname.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					content= "<div>";
					content+="<fieldset>No Stok Opname:<input type=text id=textso class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=goCariSO()>Go</button> </fieldset>";
					content+="<div id=containercari style=\"height:400px;width:600px;overflow:scroll;\">";
					content+="</div></div>";
					title=title+' SO:';
					width='600';
					height='400';
					showDialog1(title,content,width,height,ev);	
					document.getElementById('containercari').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	   
}
function goCariSO(){
	method  = 'GetNoSO';
	noso	= trim(document.getElementById('textso').value);
	unitDt	= trim(document.getElementById('lokasi').value);
	gudang	= trim(document.getElementById('gudang').value);
	periode = trim(document.getElementById('periode').value);
	
	//if(noso.length<0)
	//   alert('Text too short');
	//else{   
	param	= 'noso='+noso+'&unitDt='+unitDt+'&gudang='+gudang+'&periode='+periode+'&method='+method;
	tujuan  = 'log_slave_get_stock_opname.php';
	post_response_text(tujuan, param, respog);			
	//}
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('containercari').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}
function goPickSo(NoSo){
	document.getElementById('nostokopname').value=NoSo;
}



function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}

/*function CariNoPr(title,ev){
	content= "<div>";
	content+="<fieldset>No PR <input type=text id=noprpopup class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25><button class=mybutton onclick=CariNoPrGo()>Cari</button></fieldset>";
	content+="<div id=containerpopupsrch style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	title=title;
	width='600';
	height='440';
	showDialog1('Cari No PR',content,width,height,ev);
}

function CariNoPrGo(){
	Method 	= 'CariNoPr';
	noprpopup = document.getElementById('noprpopup').value;
	
	param  = 'method='+Method+'&noprpopup='+noprpopup;
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('containerpopupsrch').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function CariNoPrPick(nopr){
	NoPR = document.getElementById('list_'+nopr).value;
	document.getElementById('noprsrch').value = NoPR;
	closeDialog();
}

function Cari(Type,Id,ev){
	content= "<div>";
	content+="<fieldset>No "+Type+" <input type=text id="+Type+"popup class=myinputtext onkeypress=\"return tanpa_kutip(event);\" maxlength=25>";
	content+="<button class=mybutton onclick=CariGo('"+Type+"','"+Id+"')>Cari</button></fieldset>";
	content+="<div id=container"+Type+"popupsrch style=\"height:400px;width:600px;overflow:scroll;\">";
	content+="</div></div>";
	width='600';
	height='440';
	showDialog1('Cari '+Type,content,width,height,ev);
}

function CariGo(Type,Id){
	Method 	= 'Cari'+Type;
	ItemSearch = document.getElementById(Type+'popup').value;
	
	param  = 'method='+Method+'&itemsearch='+ItemSearch+'&idcari='+Id;
	tujuan = 'log_slave_get_daftar_tutup_paksa_pr.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('container'+Type+'popupsrch').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function CariPick(no,Id){
	ItemPick = document.getElementById('list_item_'+no).value;
	document.getElementById(Id).value = ItemPick;
}

*/

