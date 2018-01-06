// GET FUNCTION //
function GetGudang(){
	Method = 'GetGudang';
	Lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	
	param ='method='+Method+'&lokasi='+Lokasi;
	tujuan='log_slave_get_pemakaian_barang.php';
	
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					document.getElementById('gudang').innerHTML=con.responseText;
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
	jenisspk = document.getElementById('jenisspk').options[document.getElementById('jenisspk').selectedIndex].value;
	jenisspknama = document.getElementById('jenisspk').options[document.getElementById('jenisspk').selectedIndex].text;
	tahun = trim(document.getElementById('tahun').value);
	kontraktorID = trim(document.getElementById('kontraktorID').value);
	lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	nospk = trim(document.getElementById('nospk').value);
	
	if(jenisspk == '' || jenisspk == null){
		alert('Jenis SPK harus diisi.');
		return
	}
	if(tahun == '' || tahun == null){
		alert('Tahun harus diisi.');
		return
	}
	if(lokasi == '' || lokasi == null){
		alert('Lokasi harus diisi.');
		return
	}
	if(nospk == '' || nospk == null){
		alert('No SPK harus diisi.');
		return
	}
	
	param ='method='+Method+'&jenisspk='+jenisspk+'&tahun='+tahun+'&jenisspknama='+jenisspknama;
	param+='&kontraktorID='+kontraktorID+'&lokasi='+lokasi+'&nospk='+nospk;
	
	tujuan='log_slave_get_ba_spk.php';
	
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
	
	if(method=='GetNoSPK'){
		jenisspk = document.getElementById('jenisspk').options[document.getElementById('jenisspk').selectedIndex].value;
		param  = 'method='+method+'&textsearch='+textsearch+'&jenisspk='+jenisspk;
	} else {
		param  = 'method='+method+'&textsearch='+textsearch;
	}
	
	tujuan = 'log_slave_get_ba_spk.php';
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
function SetKontraktor(ID, Nama){
	document.getElementById('kontraktorID').value = ID;
	document.getElementById('kontraktor').value = Nama;
	closeDialog();
}
function SetNoSPK(Nama){
	document.getElementById('nospk').value = Nama;
	closeDialog();
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



function DownloadExcel(){
	Method 	= 'DownloadExcel';
	ListData = document.getElementById('ListContainer').innerHTML;
	
	param  = 'method='+Method+'&listdata='+ListData+'&judul=Laporan';
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
}*/

