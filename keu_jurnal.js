// GET FUNCTION //
function LoadDataHeader(){
	var TanggalCari = document.getElementById('tgl_cari').value;
	var NoJurnal = document.getElementById('txtsearch').value;
	
	param='method=LoadDataHeader';
	param+='&tanggal='+TanggalCari;
	param+='&nojurnal='+NoJurnal;
	tujuan = 'keu_slave_get_jurnal.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR\n' + con.responseText);}
				else {
					document.getElementById('ContainDataHeader').innerHTML=con.responseText;
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
	param='method=LoadDataHeader';
	param+='&page='+num;
	tujuan = 'keu_slave_get_jurnal.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR\n' + con.responseText);}
				else {
					document.getElementById('ContainDataHeader').innerHTML=con.responseText;
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}
function validPeriod(id) {
    var startPeriod = document.getElementById('startPeriod').value;
    var endPeriod = document.getElementById('endPeriod').value;
    var currDate = document.getElementById(id).value;
    var tmpCurr = currDate.split('-');
    //alert("start : " + startPeriod + " end : " + endPeriod);
    // Get Tgl, Bln, Tahun
    var tglStart = startPeriod.substring(6,8);
    var blnStart = startPeriod.substring(4,6);
    var thnStart = startPeriod.substring(0,4);
    
    var tglEnd = endPeriod.substring(6,8);
    var blnEnd = endPeriod.substring(4,6);
    var thnEnd = endPeriod.substring(0,4);
    
    var tglCurr = tmpCurr[0];
    var blnCurr = tmpCurr[1];
    var thnCurr = tmpCurr[2];
    
    // Make to JS Date
    var jsCurr = new Date(thnCurr,blnCurr,tglCurr);
    var jsStart = new Date(thnStart,blnStart,tglStart);
    var jsEnd = new Date(thnEnd,blnEnd,tglEnd);
    
    var vPeriod = false;
    
   // if(jsCurr<=jsEnd && jsCurr>=jsStart) {
   //     vPeriod = true;
   // }
   if(jsCurr>jsEnd)
       {
           if(confirm('The date you enter is greater than the current period, continue..?'))
               {
                 vPeriod = true;  
               }
       }
   else if(jsCurr>=jsStart)
       vPeriod = true;
    
    return vPeriod;
}
function DisplayEditData(NoJurnal){
	DisplayAddNewData();
	method = 'DisplayEditData';
	
	param  = 'method='+method+'&nojurnal='+NoJurnal;
	tujuan = 'keu_slave_get_jurnal.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('LoadFormDataDetail').style.display='block';
					ar=con.responseText.split("##");
					document.getElementById('kodejurnal').value=ar[0];
					document.getElementById('tanggal').value=ar[1];
					document.getElementById('noreferensi').value=ar[2];
					document.getElementById('matauang').value=ar[3];
					document.getElementById('nojurnal').value=ar[4];
					document.getElementById('dtl_pem').setAttribute('onclick',"EditDataHeader()");
					DisplayDetailData(ar[4]);
					document.getElementById('noakun').value='';
					document.getElementById('namaakun').value='';
					document.getElementById('keterangan').value='';
					document.getElementById('kurs').value=1;
					document.getElementById('debet').value='';
					document.getElementById('kredit').value='';
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
function DisplayDetailData(NoJurnal){
	method = 'DisplayDetailData';
	
	param  = 'method='+method+'&nojurnal='+NoJurnal;
	tujuan = 'keu_slave_get_jurnal.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('ContainDataDetail').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
function EditDetails(Id){
	method = 'EditDetails';
	
	param  = 'method='+method+'&id='+Id;
	tujuan = 'keu_slave_get_jurnal.php';
	post_response_text(tujuan, param, respog);	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					//document.getElementById('ContainDataDetail').innerHTML = con.responseText;
					ar=con.responseText.split("##");
					document.getElementById('noakun').value=ar[0];
					document.getElementById('namaakun').value=ar[1];
					document.getElementById('keterangan').value=ar[2];
					document.getElementById('matauang').value=ar[3];
					document.getElementById('kurs').value=ar[4];
					document.getElementById('debet').value=ar[5];
					document.getElementById('kredit').value=ar[6];
					
					document.getElementById('savedetail').setAttribute('onclick',"EditDataDetail("+ar[7]+")");
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
function DisplayAddNewData(){
	document.getElementById('LoadDataHeader').style.display='none';	
	document.getElementById('AddNewDataHeader').style.display='block';
	document.getElementById('LoadFormDataDetail').style.display='none';
	document.getElementById('dtl_pem').setAttribute('onclick',"AddDataHeader()");
	document.getElementById('ContainDataDetail').innerHTML = "";
}
function DisplayListDataHeader(){
	document.getElementById('LoadDataHeader').style.display='block';	
	document.getElementById('AddNewDataHeader').style.display='none';
	document.getElementById('LoadFormDataDetail').style.display='none';
	
	document.getElementById('noreferensi').value='';
	document.getElementById('kettb').value='';
	
	LoadDataHeader();
}
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
	tujuan = 'keu_slave_get_jurnal.php';
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
function SetAkun(No){
	noakun 	 = document.getElementById('noakunsrch'+No).value;
	namaakun = document.getElementById('namaakunsrch'+No).value;
	
	document.getElementById('noakun').value = noakun;
	document.getElementById('namaakun').value = namaakun;
	closeDialog();
}
function detailPDF(numRow,ev) {
    formPrint('pdf','1','##nojurnal_'+numRow,'','keu_slave_jurnal_print',ev,true);
}

// SAVE FUNCTION //
function AddDataHeader() {
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noref = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var kettb = document.getElementById('kettb');
    
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
        var param = "kodejurnal="+getOptionsValue(kodejurnal);
        param += "&tanggal="+tanggal.value;
        param += "&noreferensi="+noref.value;
        param += "&matauang="+getOptionsValue(matauang);
        param += "&kettb="+kettb.value;
        param += "&method=AddHeader";
		
		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
                        nojurnal = con.responseText;
						//document.getElementById('tabledetails tfoot').remove();
						document.getElementById('LoadFormDataDetail').style.display='block';
						document.getElementById('nojurnal').value = nojurnal;
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    } 
}
function EditDataHeader() {
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noref = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var nojurnal = document.getElementById('nojurnal');
    
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
        var param = "kodejurnal="+getOptionsValue(kodejurnal);
        param += "&tanggal="+tanggal.value;
        param += "&noreferensi="+noref.value;
        param += "&matauang="+getOptionsValue(matauang);
        param += "&nojurnal="+nojurnal.value;
        param += "&method=EditHeader";
		
		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
						alert(con.responseText);
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    } 
}
function SaveDetail(){
	var noakun 		= document.getElementById('noakun');
    var keterangan 	= document.getElementById('keterangan');
    var matauang 	= document.getElementById('matauang');
    var kurs		= document.getElementById('kurs');
    var debet		= document.getElementById('debet');
    var kredit		= document.getElementById('kredit');
    var NoJurnal	= document.getElementById('nojurnal');
    var tanggal		= document.getElementById('tanggal');
	if(debet.value != 0 && kredit.value != 0){
		alert('Debet and Kredit Error');
		return;
	}
	
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
		
        var param = "noakun="+noakun.value;
        param += "&keterangan="+keterangan.value;
        param += "&matauang="+getOptionsValue(matauang);
        param += "&kurs="+kurs.value;
        param += "&debet="+debet.value;
        param += "&kredit="+kredit.value;
        param += "&nojurnal="+NoJurnal.value;
        param += "&tanggal="+tanggal.value;
        param += "&method=SaveDetail";

		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
						alert(con.responseText);
						DisplayEditData(NoJurnal.value);
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    }
}
function EditDataDetail(id){
	var noakun 		= document.getElementById('noakun');
    var keterangan 	= document.getElementById('keterangan');
    var matauang 	= document.getElementById('matauang');
    var kurs		= document.getElementById('kurs');
    var debet		= document.getElementById('debet');
    var kredit		= document.getElementById('kredit');
    var NoJurnal	= document.getElementById('nojurnal');
    var tanggal		= document.getElementById('tanggal');
    
	if(debet.value != '' && kredit.value != '' && kredit.value != 0 && debet.value != 0){
		alert('Debet and Kredit Error');
		return;
	}
	
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
        var param = "noakun="+noakun.value;
        param += "&keterangan="+keterangan.value;
        param += "&matauang="+getOptionsValue(matauang);
        param += "&kurs="+kurs.value;
        param += "&debet="+debet.value;
        param += "&kredit="+kredit.value;
        param += "&nojurnal="+NoJurnal.value;
        param += "&tanggal="+tanggal.value;
        param += "&id="+id;
        param += "&method=EditDetail";

		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
						alert(con.responseText);
						DisplayEditData(NoJurnal.value);
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    }
}
function DeleteDetails(id){
    var tanggal		= document.getElementById('tanggal');
	var NoJurnal	= document.getElementById('nojurnal');
	
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
        var param = "id="+id;
		param += "&nojurnal="+NoJurnal.value;
        param += "&method=DeleteDetail";

		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
						alert(con.responseText);
						DisplayEditData(NoJurnal.value);
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    }
}
function delHead(NoJurnal){
	var tanggal		= document.getElementById('tanggal');
	
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
		return;
    }else if(validPeriod('tanggal')) {
        var param = "nojurnal="+NoJurnal;
        param += "&method=DeleteHeader";

		post_response_text('keu_slave_save_jurnal.php', param, respon);
		
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
						alert(con.responseText);
						location.reload();
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
    } else {
        alert("Date beyond active periode");
    }
}
/* Function addModeForm
 * Fungsi untuk mengubah form header menjadi mode tambah
 * O : form header mode tambah
 */


/* Function addModeForm
 * Fungsi untuk mengubah form header menjadi mode tambah
 * O : form header mode tambah
 */
function addModeForm(theme) {
    var kodejurnal = document.getElementById('kodejurnal');
    var nojurnal = document.getElementById('nojurnal');
    var tanggal = document.getElementById('tanggal');
    var noreferensi = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var saveBtn = document.getElementById('saveButton');
    var fieldForm = document.getElementById('fieldFormHeader');
    
    // Remove Disabled
    kodejurnal.removeAttribute('disabled');
    nojurnal.removeAttribute('disabled');
    tanggal.removeAttribute('disabled');
    noreferensi.removeAttribute('disabled');
    matauang.removeAttribute('disabled');
    saveBtn.removeAttribute('disabled');
    saveBtn.removeAttribute('onclick');
    
    // Set Attr
    tanggal.setAttribute('onmousemove','setCalendar(this.id)');
    saveBtn.setAttribute('onclick',"addDataHeader('"+theme+"')");
    fieldForm.firstChild.firstChild.innerHTML = 'Form Header : Add New Data';
}

/* Function editModeForm
 * Fungsi untuk mengubah form header menjadi mode edit
 * I : Nomor Row pada tabel header
 * O : form header mode edit
 */
function editModeForm(num) {
    var rowKodejurnal = document.getElementById('kodejurnal_'+num);
    var rowNojurnal = document.getElementById('nojurnal_'+num);
    var rowTanggal = document.getElementById('tanggal_'+num);
    var rowNoreferensi = document.getElementById('noreferensi_'+num);
    var rowMatauang = document.getElementById('matauang_'+num);
    var rowPosting = document.getElementById('isposting_'+num).innerHTML;
    
    var kodejurnal = document.getElementById('kodejurnal');
    var nojurnal = document.getElementById('nojurnal');
    var tanggal = document.getElementById('tanggal');
    var noreferensi = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var saveBtn = document.getElementById('saveButton');
    var fieldForm = document.getElementById('fieldFormHeader');
    
    // Pass Value
    kodejurnal.value = rowKodejurnal.innerHTML;
    nojurnal.value = rowNojurnal.innerHTML;
    tanggal.value = rowTanggal.innerHTML;
    matauang.value = rowMatauang.innerHTML;
    noreferensi.value = rowNoreferensi.innerHTML;
    
    // Disabled
    kodejurnal.setAttribute('disabled','disabled');
    nojurnal.setAttribute('disabled','disabled');
	
    
	if(rowPosting == 'Belum Posting') {
		 // Remove Disabled
		tanggal.removeAttribute('disabled');
		noreferensi.removeAttribute('disabled');
		matauang.removeAttribute('disabled');
		saveBtn.removeAttribute('disabled');
		saveBtn.removeAttribute('onclick');
		
		// Set Attr
		tanggal.setAttribute('onmousemove','setCalendar(this.id)');
		saveBtn.setAttribute('onclick','editDataHeader('+num+')');
		fieldForm.firstChild.firstChild.innerHTML = 'Form Header : Edit Data';
		
		showDetail();
	} else {
		tanggal.setAttribute('disabled','disabled');
		noreferensi.setAttribute('disabled','disabled');
		matauang.setAttribute('disabled','disabled');
		saveBtn.setAttribute('disabled','disabled');
		
		hideDetail();
		document.getElementById("form_").remove();
	}
}

/* Function addDataHeader
 * Fungsi untuk menambah data header
 * O : form header mode tambah
 */


/* Function addHeaderRow
 * Fungsi untuk menambah row baru hasil penambahan header
 * O : Row baru pada table header
 */
function addHeaderRow(theme) {
    var bodyHeader = document.getElementById('bodyListHeader');
    var nojurnal = document.getElementById('nojurnal');
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noreferensi = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    
    // Search Available numRow
    var numRow = 0;
    while(document.getElementById('tr_'+numRow)) {
        numRow++;
    }
    
    // Prep row
    var kodeVal = kodejurnal.options[kodejurnal.selectedIndex].value;
    var theRow = "<tr id='tr_"+numRow+"' class='rowcontent'>";
    theRow += "<td id='pdf_"+numRow+"'><img src='images/"+theme+"/pdf.jpg' ";
    theRow += "class='zImgBtn' onclick='detailPDF("+numRow+",event)'></td>";
    theRow += "<td id='delHead_"+numRow+"'><img src='images/"+theme+"/delete.png' ";
    theRow += "class='zImgBtn' onclick='delHead("+numRow+")'></td>";
    theRow += "<td onclick='passEditHeader("+numRow+")' id='kodejurnal_"+numRow+"'>"+kodeVal+"</td>";
    theRow += "<td onclick='passEditHeader("+numRow+")' id='nojurnal_"+numRow+"'>"+nojurnal.value+"</td>";
    theRow += "<td onclick='passEditHeader("+numRow+")' id='tanggal_"+numRow+"'>"+tanggal.value+"</td>";
    theRow += "<td onclick='passEditHeader("+numRow+")' id='noreferensi_"+numRow+"'>"+noreferensi.value+"</td>";
    theRow += "<td onclick='passEditHeader("+numRow+")' id='matauang_"+numRow+"'>"+matauang.value+"</td>";
    theRow += "</tr>";
    
    // Insert Row
    bodyHeader.innerHTML += theRow;
}

/* Function editDataHeader
 * Fungsi untuk mengubah data header
 * O : form header mode edit
 */
function editDataHeader(numRow) {
    var nojurnal = document.getElementById('nojurnal');
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noref = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var fieldForm = document.getElementById('fieldFormHeader');
    
    // Empty = Not Valid
    if(tanggal.value=='') {
        alert('Date is obligatory');
        //exit;
    }else if(validPeriod('tanggal')) {
        var param = "nojurnal="+nojurnal.value;
        param += "&kodejurnal="+getOptionsValue(kodejurnal);
        param += "&tanggal="+tanggal.value;
        param += "&noreferensi="+noref.value;
        param += "&matauang="+getOptionsValue(matauang);
        
        function respon() {
            if (con.readyState == 4) {
                if (con.status == 200) {
                    busy_off();
                    if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                    } else {
                        // Success Response
                        eval("var res = "+con.responseText);
                        
                        document.getElementById('kodejurnal_'+numRow).innerHTML = res.kodejurnal;
                        document.getElementById('tanggal_'+numRow).innerHTML = res.tanggal;
                        document.getElementById('noreferensi_'+numRow).innerHTML = res.noreferensi;
                        document.getElementById('matauang_'+numRow).innerHTML = res.matauang;
                    }
                } else {
                    busy_off();
                    error_catch(con.status);
                }
            }
        }
        
        post_response_text('keu_slave_jurnal_header.php?proses=edit', param, respon);
    } else {
        alert("Date beyond active periode");
    }
}

/* Function showDetail
 * Fungsi untuk menambah row baru hasil penambahan header
 * O : Row baru pada table header
 */
function showDetail() {
    var nojurnal = document.getElementById('nojurnal');
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noref = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var fieldForm = document.getElementById('fieldFormHeader');
    
    var param = "nojurnal="+nojurnal.value;
    param += "&kodejurnal="+getOptionsValue(kodejurnal);
    param += "&tanggal="+tanggal.value;
    param += "&noreferensi="+noref.value;
    param += "&matauang="+getOptionsValue(matauang);
    
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    var divDet = document.getElementById('divDetail');
                    if(divDet) {
                        divDet.innerHTML = con.responseText;
                    } else {
                        alert('DOM Definition Error : divDetail');
                    }
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('keu_slave_jurnal_detail.php?proses=show', param, respon);
}

function hideDetail() {
    var nojurnal = document.getElementById('nojurnal');
    var kodejurnal = document.getElementById('kodejurnal');
    var tanggal = document.getElementById('tanggal');
    var noref = document.getElementById('noreferensi');
    var matauang = document.getElementById('matauang');
    var fieldForm = document.getElementById('fieldFormHeader');
    
    var param = "nojurnal="+nojurnal.value;
    param += "&kodejurnal="+getOptionsValue(kodejurnal);
    param += "&tanggal="+tanggal.value;
    param += "&noreferensi="+noref.value;
    param += "&matauang="+getOptionsValue(matauang);
    
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    var divDet = document.getElementById('divDetail');
                    if(divDet) {
                        divDet.innerHTML = con.responseText;
                    } else {
                        alert('DOM Definition Error : divDetail');
                    }
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('keu_slave_jurnal_detail.php?proses=show2', param, respon);
}

/*function delHead(num) {
    var nojurnal = document.getElementById('nojurnal_'+num).innerHTML;
    var theRow = document.getElementById('tr_'+num);
    
    var param = "nojurnal="+nojurnal;
    
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    theRow.parentNode.removeChild(theRow);
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    if(confirm("Removing Journal header \nAre you sure?")) {
        post_response_text('keu_slave_jurnal_header.php?proses=delete', param, respon);
    }
}

/* Function passEditHeader
 * Fungsi untuk mengubah form header menjadi mode edit dan lihat detailnya
 * O : Form header mode edit, dan tampilkan detail
 */
function passEditHeader(num) {
    editModeForm(num);
}

