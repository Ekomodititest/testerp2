function baru(){
    document.getElementById('form').style.display = '';
    document.getElementById('listdata').style.display = 'none';
    document.getElementById('method').value = 'insert';
	
    document.getElementById('tipe').value;
    document.getElementById('nospk').value='';
    document.getElementById('nmkerja').value='';
    document.getElementById('act').value='';
    document.getElementById('cip').value='';
    document.getElementById('pihak1').value;
    document.getElementById('pihak2').value='';
    document.getElementById('noreff').value='';
    document.getElementById('mu').value='';
    document.getElementById('nilai').value=0;
    document.getElementById('waktu').value='';
    document.getElementById('bayar').value='';
    document.getElementById('garansi').value='';
    document.getElementById('lain').value='';	
    document.getElementById('ppnpersen').value;
    document.getElementById('nilaippn').value=0;
    document.getElementById('pphpersen').value;
    document.getElementById('nilaipph').value=0;
    document.getElementById('muspk').value='';
    document.getElementById('nilaispk').value=0;
    document.getElementById('dppersen').value='';
    document.getElementById('nilaidp').value=0;	
    document.getElementById('penalti').value='';	
    document.getElementById('approval').value='';	

    if(document.getElementById('tipe').value==0){
        document.getElementById('hideact').style.display = '';
        document.getElementById('hidecip').style.display = 'none';
        document.getElementById('hidepo').style.display = '';
    }
    else {
        document.getElementById('hideact').style.display = 'none';
        document.getElementById('hidecip').style.display = '';
        document.getElementById('hidepo').style.display = 'none';
    }	
		document.getElementById("nospk").disabled = false;
}

function listdata(){
	window.location.assign("spk.php");	
}

function tipex(tipe){
    if(tipe==0){
        document.getElementById('hideact').style.display = '';
        document.getElementById('hidecip').style.display = 'none';
        document.getElementById('hidepo').style.display = '';
    }
    else {
        document.getElementById('hideact').style.display = 'none';
        document.getElementById('hidecip').style.display = '';
        document.getElementById('hidepo').style.display = 'none';
    }
}

function cancel(){
    location.reload(true);
}

function del(nospk){
    param='nospk='+nospk+'&method=delete';
    tujuan='log_slave_spk_new.php';
    if(confirm(document.getElementById('alertqdelete').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				window.location.reload();
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }
}

function loadDatad(){
    param='method=refresh_data';
    tujuan = 'log_slave_spk_new.php';
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

function cariBast(num){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;

    param='method=refresh_data';
    param+='&page='+num;
    param+='&filter='+filter+'&keyword='+keyword;
    tujuan = 'log_slave_spk_new.php';
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

function search(){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;
    if(filter==''){
        document.getElementById('keyword').value='';
    }
    else {
        if(keyword=='') {
            alert(document.getElementById('findword').innerHTML + ' ' + document.getElementById('alertrequired').value);
        }
    }

    param='filter='+filter+'&keyword='+keyword+'&method=refresh_data';
    tujuan = 'log_slave_spk_new.php';
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

function edit(nospk,tipe,nmkerja,act,cip,pihak1,pihak2,noreff,mu,nilai,waktu,bayar,garansi,lain,ppnpersen,nilaippn,pphpersen,nilaipph,muspk,nilaispk,dppersen,nilaidp,penalti,approval,tglspk){
    document.getElementById('form').style.display = '';
    document.getElementById('listdata').style.display = 'none';
    document.getElementById('method').value = 'update';

	document.getElementById('nospk').value = nospk;
    document.getElementById('tipe').value = tipe;
    document.getElementById('nmkerja').value = nmkerja;
    document.getElementById('act').value = act;
    document.getElementById('cip').value = cip;
    document.getElementById('pihak1').value = pihak1;
    document.getElementById('pihak2').value = pihak2;
    document.getElementById('noreff').value = noreff;
    document.getElementById('mu').value = mu;
    document.getElementById('nilai').value = nilai;
    document.getElementById('waktu').value = waktu;
    document.getElementById('bayar').value = bayar;
    document.getElementById('garansi').value = garansi;
    document.getElementById('lain').value = lain;
    document.getElementById('ppnpersen').value = ppnpersen;
    document.getElementById('nilaippn').value = nilaippn;
    document.getElementById('pphpersen').value = pphpersen;
    document.getElementById('nilaipph').value = nilaipph;
    document.getElementById('muspk').value = muspk;
    document.getElementById('nilaispk').value = nilaispk;
    document.getElementById('dppersen').value = dppersen;
    document.getElementById('nilaidp').value = nilaidp;
    document.getElementById('penalti').value = penalti;
    document.getElementById('approval').value = approval;
    document.getElementById('tglspk').value = tglspk;

    if(tipe==0) {
        document.getElementById('hideact').style.display = '';
        document.getElementById('hidecip').style.display = 'none';
        document.getElementById('hidepo').style.display = '';
    }
    else {
        document.getElementById('hideact').style.display = 'none';
        document.getElementById('hidecip').style.display = '';
        document.getElementById('hidepo').style.display = 'none';
    }
		document.getElementById("nospk").disabled = true;
}

function simpanx(){
    tipe	= document.getElementById('tipe').value;
	tglspk	= document.getElementById('tglspk').value;
    nospk	= trim(document.getElementById('nospk').value);
    nmkerja	= trim(document.getElementById('nmkerja').value);
    act		= trim(document.getElementById('act').value);
    cip		= trim(document.getElementById('cip').value);
    pihak1	= trim(document.getElementById('pihak1').value);
    pihak2	= trim(document.getElementById('pihak2').value);
    noreff	= trim(document.getElementById('noreff').value);
    mu 		= trim(document.getElementById('mu').value);
    nilai	= remove_comma(document.getElementById('nilai'));
    waktu	= trim(document.getElementById('waktu').value);
    bayar	= trim(document.getElementById('bayar').value);
    garansi	= trim(document.getElementById('garansi').value);
    lain	= trim(document.getElementById('lain').value);	
    ppnpersen	= trim(document.getElementById('ppnpersen').value);
    nilaippn	= remove_comma(document.getElementById('nilaippn'));
    pphpersen	= trim(document.getElementById('pphpersen').value);
    nilaipph	= remove_comma(document.getElementById('nilaipph'));
    muspk		= trim(document.getElementById('muspk').value);
    nilaispk	= remove_comma(document.getElementById('nilaispk'));
    dppersen	= trim(document.getElementById('dppersen').value);
    nilaidp		= remove_comma(document.getElementById('nilaidp'));	
    method		= trim(document.getElementById('method').value);
    penalti		= trim(document.getElementById('penalti').value);
    approval	= trim(document.getElementById('approval').value);
	
	if(nilai==''){nilai=0;}
	if(ppnpersen==''){ppnpersen=0;}
	if(nilaippn==''){nilaippn=0;}
	if(pphpersen==''){pphpersen=0;}
	if(nilaipph==''){nilaipph=0;}
	if(nilaispk==''){nilaispk=0;}
	if(dppersen==''){dppersen=0;}
	if(nilaidp==''){nilaidp=0;}
	
	param='tipe='+tipe+'&nospk='+nospk+'&nmkerja='+nmkerja+'&act='+act+'&cip='+cip+'&pihak1='+pihak1+'&pihak2='+pihak2+'&noreff='+noreff+'&mu='+mu+'&nilai='+nilai+'&waktu='+waktu+'&bayar='+bayar+'&garansi='+garansi+'&lain='+lain+'&method='+method+'&ppnpersen='+ppnpersen+'&nilaippn='+nilaippn+'&pphpersen='+pphpersen+'&nilaipph='+nilaipph+'&muspk='+muspk+'&nilaispk='+nilaispk+'&dppersen='+dppersen+'&nilaidp='+nilaidp;
	param+='&penalti='+penalti+'&approval='+approval+'&tglspk='+tglspk;	
	tujuan='log_slave_spk_new.php';

	if(tipe==1){ 
		if(nospk=='') {
			alert(document.getElementById('lbl_nospk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(tglspk=='') {
			alert(document.getElementById('lbl_tanggal').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(nmkerja=='') {
			alert(document.getElementById('lbl_nmkerja').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(cip=='') {
			alert(document.getElementById('lbl_cip').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(pihak2=='') {
			alert(document.getElementById('lbl_pihak2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(noreff=='') {
			alert(document.getElementById('lbl_noreff').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(mu=='') {
			alert(document.getElementById('lbl_nilai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilai=='') {
			alert(document.getElementById('lbl_nilai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}							
		else if(muspk=='') {
			alert(document.getElementById('lbl_totalspk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaispk=='') {
			alert(document.getElementById('lbl_totalspk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(dppersen=='') {
			alert(document.getElementById('lbl_totaldp').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaidp=='') {
			alert(document.getElementById('lbl_totaldp').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(waktu=='') {
			alert(document.getElementById('lbl_waktu').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}
		else if(garansi=='') {
			alert(document.getElementById('lbl_garansi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(bayar=='') {
			alert(document.getElementById('lbl_bayar').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(penalti=='') {
			alert(document.getElementById('lbl_penalti').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(approval=='') {
			alert(document.getElementById('lbl_tggjwb').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else {
			if(confirm(document.getElementById('alertqinsert').value)){
			   post_response_text(tujuan, param, respog);
			}
		}		
	} 
	else {
		if(nospk=='') {
			alert(document.getElementById('lbl_nospk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(nmkerja=='') {
			alert(document.getElementById('lbl_nmkerja').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}
		else if(act=='') {
			alert(document.getElementById('lbl_act').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(pihak2=='') {
			alert(document.getElementById('lbl_pihak2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(noreff=='') {
			alert(document.getElementById('lbl_noreff').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(mu=='') {
			alert(document.getElementById('lbl_nilai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilai=='') {
			alert(document.getElementById('lbl_nilai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		/* else if(ppnpersen=='') {
			alert(document.getElementById('lbl_ppn').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaippn=='') {
			alert(document.getElementById('lbl_ppn').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(pphpersen=='') {
			alert(document.getElementById('lbl_pph').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaipph=='') {
			alert(document.getElementById('lbl_pph').innerHTML + ' ' + document.getElementById('alertrequired').value);
		} */		
		else if(muspk=='') {
			alert(document.getElementById('lbl_totalspk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaispk=='') {
			alert(document.getElementById('lbl_totalspk').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(dppersen=='') {
			alert(document.getElementById('lbl_totaldp').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(nilaidp=='') {
			alert(document.getElementById('lbl_totaldp').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}			
		else if(waktu=='') {
			alert(document.getElementById('lbl_waktu').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}
		else if(garansi=='') {
			alert(document.getElementById('lbl_garansi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}	
		else if(bayar=='') {
			alert(document.getElementById('lbl_bayar').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(penalti=='') {
			alert(document.getElementById('lbl_penalti').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(approval=='') {
			alert(document.getElementById('lbl_tggjwb').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}		
		else {
			if(confirm(document.getElementById('alertqinsert').value)){
			   post_response_text(tujuan, param, respog);
			}
		}		
	}
	
function respog(){
if(con.readyState==4){
		if (con.status == 200){
			busy_off();
			if (!isSaveResponse(con.responseText)) {
					alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
}	
}    
}

function inserLink(title,content,ev){
	width='500';
	height='400';
	if(document.getElementById('url1_'+ev) == null) {
		url1 = '';
	} else {
		url1 = document.getElementById('url1_'+ev).value;
		
	}	
	showDialog1(title,content,width,height,ev);
	document.getElementById('link1_'+ev).value = url1;	
}

function saveLink(row){
	nospk = document.getElementById('spkno').value;
	links = document.getElementById('link1_'+row).value;	
	document.getElementById('url1_'+row).value = links;
	//closeDialog();
	
    param='nospk='+nospk+'&links='+links+'&method=link';
    tujuan='log_slave_spk_new.php';
    if(confirm(document.getElementById('alertqinsert').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				window.location.reload();
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function previewDetail(ev){
	nospk = document.getElementById('nospk').value;
	if(nospk==''){
		alert(document.getElementById('lbl_nospk').innerHTML + ' ' + document.getElementById('alertrequired').value);
	} 
	else {
		showDetail(nospk,ev);
		param='nospk='+nospk+'&method=InsertLinkPO';
		tujuan='log_slave_spk_new.php';
		post_response_text(tujuan, param, respog);
		document.getElementById('methodlink').value='saveLinkPO';
		function respog(){
		  if(con.readyState==4){
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								document.getElementById('contDetail').innerHTML=con.responseText;
						}
						else {
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
}

function showDetail(ev){
	nospk = document.getElementById('nospk').value;
	title="Link Reff PO";
	content="<fieldset><legend>"+nospk.toUpperCase()+"</legend><div id=contDetail style='overflow:auto; width:300px; height:300px;' ></div></fieldset><input type=hidden id=viewSpk value="+nospk+" /> <input type=hidden id=methodlink value=saveLinkPO/>'";
	width='400';
	height='400';
	showDialog1(title,content,width,height,ev);	
}

function saveLinkPO(){
	nospk = document.getElementById('viewSpk').value;
	po    = document.getElementById('linkpo').value;
	method= document.getElementById('methodlink').value;
	id= document.getElementById('id').value;
    param='nospk='+nospk+'&po='+po+'&method='+method+'&id='+id;
    tujuan='log_slave_spk_new.php';
	
	if(po==''){
		alert('PO ' + document.getElementById('alertrequired').value);		
	} 
	else {
		if(confirm(document.getElementById('alertqinsert').value)){
			post_response_text(tujuan, param, respog);
		}			
	}
	
    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				previewDetail('event');
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function delLinkPo(id){
    param='id='+id+'&method=delLinkPo';
    tujuan='log_slave_spk_new.php';
    if(confirm(document.getElementById('alertqdelete').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				previewDetail('event');
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }
}

function editLinkPo(id,po,nospk){
	document.getElementById('methodlink').value='updateLinkPO';
	document.getElementById('id').value=id;
	document.getElementById('linkpo').value=po;
	document.getElementById('nospk').value=nospk;
}

function rilis(id){
    param='id='+id+'&method=updatestatus';
    tujuan='log_slave_spk_new.php';
    if(confirm('Apakah anda yakin akan release ?')){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function unrilis(id){
    param='id='+id+'&method=updatestatus1';
    tujuan='log_slave_spk_new.php';
    if(confirm('Apakah anda yakin akan unrelease ?')){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

/*
Berita Acara SPK
*/

function loadDataBA(){
    param='method=loadBA';
    tujuan = 'log_slave_spk_new.php';
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

function search1(){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;
    if(filter==''){
        document.getElementById('keyword').value='';
    }
    else {
        if(keyword=='') {
            alert(document.getElementById('findword').innerHTML + ' ' + document.getElementById('alertrequired').value);
        }
    }

    param='filter='+filter+'&keyword='+keyword+'&method=loadBA';
    tujuan = 'log_slave_spk_new.php';
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

function editba(nospk,tipe,mu,nilai,nmkerja){
	document.getElementById('lbl_spk').innerHTML = nospk;
	if(tipe==0) { tip = 'Kecil';} else { tip = 'Besar';}
	document.getElementById('lbl_tipe').innerHTML = tip;
	document.getElementById('lbl_act').innerHTML = nmkerja;
	document.getElementById('lbl_nilai').innerHTML = mu + ' ' + nilai;
}

function saveba(){
	tipeba = document.getElementById('tipeba').value;
	tglba = document.getElementById('tglba').value;
	namaba = document.getElementById('namaba').value;
	persen = remove_comma(document.getElementById('persen'));
	deskripsi = document.getElementById('deskripsi').value;
	dppba = document.getElementById('dppba').value;
	nominaldpp = remove_comma(document.getElementById('nominaldpp'));
	ppn = document.getElementById('ppn').value;
	nominalppn = remove_comma(document.getElementById('nominalppn'));
	pph = document.getElementById('pph').value;
	nominalpph = remove_comma(document.getElementById('nominalpph'));
	totalba = document.getElementById('totalba').value;
	nominaltotal = remove_comma(document.getElementById('nominaltotal'));
	spk = document.getElementById('spkno').innerHTML;
	method = document.getElementById('method').value;
	id = document.getElementById('id').value;
	
    param='tipeba='+tipeba+'&namaba='+namaba+'&persen='+persen+'&deskripsi='+deskripsi+'&dppba='+dppba+'&nominaldpp='+nominaldpp+'&ppn='+ppn+'&nominalppn='+nominalppn+'&pph='+pph+'&nominalpph='+nominalpph+'&totalba='+totalba+'&nominaltotal='+nominaltotal+'&spk='+spk+'&method='+method+'&id='+id+'&tglba='+tglba;
    tujuan='log_slave_spk_new.php';
	//alert(param);
    if(confirm(document.getElementById('alertqinsert').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function loadDetailBA(){
	spk = document.getElementById('spkno').innerHTML;
    param='method=loadDetailBA&spk='+spk;
    tujuan = 'log_slave_spk_new.php';
    post_response_text(tujuan, param, respog);
    function respog(){
          if(con.readyState==4){
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR\n' + con.responseText);
                        }
                        else {
                            document.getElementById('contain').innerHTML=con.responseText;
                        }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
          }
     }
}

function cariBastqqq(num){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;

    param='method=loadBA';
    param+='&page='+num;
    param+='&filter='+filter+'&keyword='+keyword;
    tujuan = 'log_slave_spk_new.php';
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

function cariBast1(num){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;

    param='method=loadDetailBA';
    param+='&page='+num;
    param+='&filter='+filter+'&keyword='+keyword;
    tujuan = 'log_slave_spk_new.php';
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

function editBA(id,spk,tipeba,namaba,persen,deskripsi,dppba,nominaldpp,ppn,nominalppn,pph,nominalpph,totalba,nominaltotal,tglba){
	document.getElementById('id').value=id;
	document.getElementById('tipeba').value=tipeba;
	document.getElementById('namaba').value=namaba;
	document.getElementById('persen').value=persen;
	document.getElementById('deskripsi').value=deskripsi;
	document.getElementById('dppba').value=dppba;
	document.getElementById('nominaldpp').value=nominaldpp;
	document.getElementById('ppn').value=ppn;
	document.getElementById('nominalppn').value=nominalppn;
	document.getElementById('pph').value=pph;
	document.getElementById('nominalpph').value=nominalpph;
	document.getElementById('totalba').value=totalba;
	document.getElementById('nominaltotal').value=nominaltotal;
	document.getElementById('tglba').value=tglba;
	document.getElementById('spkno').innerHTML=spk;	
	document.getElementById('method').value='updateba';	
}

function delBA(id){
    param='id='+id+'&method=delBA';
    tujuan='log_slave_spk_new.php';
    if(confirm(document.getElementById('alertqdelete').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }
}

function saveLinkBA(row){
	idx = document.getElementById('idx').value;
	links = document.getElementById('link1_'+row).value;	
	document.getElementById('url1_'+row).value = links;	
    param='idx='+idx+'&links='+links+'&method=linkBA';
	//alert(param);
    tujuan='log_slave_spk_new.php';
    if(confirm(document.getElementById('alertqinsert').value)){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				window.location.reload();
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function switchcombo1(id){
	document.getElementById('mu').value = id;
}

function getDpp(){
	var myppnpersen = document.getElementById('ppnpersen').value;
	var myppnarrpersen = myppnpersen.split("-");
	var hasilppnpersen = myppnarrpersen[1]/100;
	
	var mypphpersen = document.getElementById('pphpersen').value;
	var mypphpersenarr = mypphpersen.split("-");
	var hasilpphpersen = mypphpersenarr[1]/100;	
		
	var nilaispk = remove_comma(document.getElementById('nilaispk'));	
	dpp = nilaispk/(1+(hasilppnpersen-hasilpphpersen));
	document.getElementById('nilai').value = parseFloat(dpp);
	change_number(document.getElementById('nilai'));			
}

function hitungppn(){
	pphx = document.getElementById('pphpersen').value;
	if(pphx!=''){
		getDpp();	
	} 	
	var ppnpersen = document.getElementById('ppnpersen').value;
	var myppnarr = ppnpersen.split("-");
	var hasilppn = myppnarr[1]/100;
	var nilaispkppn = remove_comma(document.getElementById('nilai'));	
	var hslhitungppn = nilaispkppn*hasilppn;
	document.getElementById('nilaippn').value = parseFloat(hslhitungppn);
	change_number(document.getElementById('nilaippn'));	
}

function hitungpph(){
	ppnx = document.getElementById('ppnpersen').value;
	if(ppnx!=''){
		getDpp();	
	} 		
	var pphpersen = document.getElementById('pphpersen').value;	
	var myppharr = pphpersen.split("-");
	var hasilpph = myppharr[1]/100;
	var nilaispkpph = remove_comma(document.getElementById('nilai'));	
	var hslhitungpph = nilaispkpph*hasilpph;
	document.getElementById('nilaipph').value = parseFloat(hslhitungpph);
	change_number(document.getElementById('nilaipph'));	
}

function calculateTotal(){
	getDpp()	
	var mystr = document.getElementById('ppnpersen').value;
	var myarr = mystr.split("-");
	var ppn = myarr[1]/100;		
	var nilaispk1 = remove_comma(document.getElementById('nilai'));	
	var hslppn1 = nilaispk1*ppn;
	document.getElementById('nilaippn').value = parseFloat(hslppn1);
	change_number(document.getElementById('nilaippn'));

	var mystr1 = document.getElementById('pphpersen').value;
	var myarr1 = mystr1.split("-");
	var pph1 = myarr1[1]/100;	
	var nilaispk2= remove_comma(document.getElementById('nilai'));	
	var hslpph1 = nilaispk2*pph1;
	document.getElementById('nilaipph').value = parseFloat(hslpph1);
	change_number(document.getElementById('nilaipph'));		
}

function calculateTotalDP(){
	var persen = document.getElementById('dppersen').value;
	
	if(persen > 100) {
		alert('tidak boleh melebihi 100%');
		document.getElementById("submit").disabled = true;
		document.getElementById('dppersen').value=0;
	} 
	else {
		var nilaispk = remove_comma(document.getElementById('nilaispk'));
		var dp = document.getElementById('dppersen').value/100;
		var hsltotaldp = nilaispk*dp;
		document.getElementById('nilaidp').value = parseFloat(hsltotaldp);
		change_number(document.getElementById('nilaidp'));			
		document.getElementById("submit").disabled = false;
	}	
}

function PostingBA(id,spk,tipe){
    param='id='+id+'&spk='+spk+'&tipe='+tipe+'&method=PostingBA';
    tujuan='log_slave_spk_new.php';
    if(confirm('Posting ?')){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function completed(id){
    param='id='+id+'&method=statuscomplete';
    tujuan='log_slave_spk_new.php';
    if(confirm('semua BA Sudah diposting, Apakah SPK dianggap selesai ?')){
        post_response_text(tujuan, param, respog);
    }

    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function belumAdaBa(id){
    param='id='+id+'&method=statuscomplete';
    tujuan='log_slave_spk_new.php';
    if(confirm('Belum ada BA, Apakah SPK dianggap selesai ?')){
        post_response_text(tujuan, param, respog);
    }
    function respog(){
		if(con.readyState==4){
		if(con.status == 200) {
			busy_off();
			if (!isSaveResponse(con.responseText)){
				alert('ERROR\n' + con.responseText);
			}
			else {
				alert(con.responseText);
				location.reload(true);
			}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
		}
    }	
}

function loadDataPostingBA(){
    param='method=loadDataPostingBA';
    tujuan = 'log_slave_spk_new.php';
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

function loadDetailBAPosting(){
	spk = document.getElementById('spkno').innerHTML;
    param='method=loadDetailBAPosting&spk='+spk;
    tujuan = 'log_slave_spk_new.php';
    post_response_text(tujuan, param, respog);
    function respog(){
          if(con.readyState==4){
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR\n' + con.responseText);
                        }
                        else {
                            document.getElementById('contain').innerHTML=con.responseText;
                        }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
          }
     }
}

function search2(){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;
    if(filter==''){
        document.getElementById('keyword').value='';
    }
    else {
        if(keyword=='') {
            alert(document.getElementById('findword').innerHTML + ' ' + document.getElementById('alertrequired').value);
        }
    }

    param='filter='+filter+'&keyword='+keyword+'&method=loadDataPostingBA';
    tujuan = 'log_slave_spk_new.php';
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

function cariBastxxx(num){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;
    param='method=loadDataPostingBA';
    param+='&page='+num;
    param+='&filter='+filter+'&keyword='+keyword;
    tujuan = 'log_slave_spk_new.php';
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

function cariBast123(num){
    filter  = document.getElementById('filter').value;
    keyword = document.getElementById('keyword').value;
    param='method=loadDetailBAPosting';
    param+='&page='+num;
    param+='&filter='+filter+'&keyword='+keyword;
    tujuan = 'log_slave_spk_new.php';
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