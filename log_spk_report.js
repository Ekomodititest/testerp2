// GET FUNCTION //
function DisplayList(){
	Method = 'LoadData';
	jenisspk = document.getElementById('jenisspk').options[document.getElementById('jenisspk').selectedIndex].value;
	jenisspknama = document.getElementById('jenisspk').options[document.getElementById('jenisspk').selectedIndex].text;
	tahun = trim(document.getElementById('tahun').value);
	kontraktorID = trim(document.getElementById('kontraktorID').value);
	lokasi = document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value;
	
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

	param ='method='+Method+'&jenisspk='+jenisspk+'&tahun='+tahun+'&jenisspknama='+jenisspknama;
	param+='&kontraktorID='+kontraktorID+'&lokasi='+lokasi;
	
	tujuan='log_slave_get_spk_report.php';
	
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