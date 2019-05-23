function fillField(pbbkb,awalan_po,nopo,tgl_po,supplier_id,sub_tot,disc,nil_ppn,grnd_tot,rek,npwp,diskon_nilai,stat,tglKrm,matauang,angKurs,ttd,loKrm,tandtgn2, ongKirim, syaratbayar){
	if(stat==3){alert("This PO has been released");return;}
	/*if(stat==2) {
		document.getElementById('tgl_po').disabled=true;asdf asdf
		document.getElementById('supplier_id').disabled=true;asd fsadf
		document.getElementById('mtUang').disabled=true;a dfa
		document.getElementById('Kurs').disabled=true;
		document.getElementById('persetujuan_id').disabled=true;ads fadf
	}*/
	
	// HEADER //
	status_inputan=1;
	document.getElementById('dataAtas').style.display='none';
	document.getElementById('no_po').value=nopo;
	document.getElementById('tgl_po').value=tgl_po;						
	document.getElementById('supplier_id').value=supplier_id;
	document.getElementById('mtUang').value=matauang;
	document.getElementById('npwp_sup').value=npwp;
	document.getElementById('awalan_po').value=awalan_po;
	document.getElementById('persetujuan_id').value=ttd;
	rproses=document.getElementById('proses').value='edit_po';
	dnopp=document.getElementById('no_po').value=nopo;
	param='nopo='+dnopp+'&proses='+rproses;
	tujuan='log_slave_po_detail.php';
						
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {														   
					show_form_po();
					ar=con.responseText.split("###");
					document.getElementById('ppDetailTable').innerHTML=ar[0];
					document.getElementById('total_biaya').value=ar[1];
					
					document.getElementById('diskon').value=disc;
					document.getElementById('angDiskon').value=diskon_nilai;
					document.getElementById('ppn').value=nil_ppn;
					
					document.getElementById('grand_total').value=grnd_tot;
					//document.getElementById('tgl_krm').value=tglKrm;
					
					// FOOTER
					document.getElementById('waktu_penyerahan').value=ar[2];
					document.getElementById('term_pay').value=ar[3];
					document.getElementById('tmpt_krm').value=ar[4];
					document.getElementById('garansi').value=ar[5];
					document.getElementById('ketUraian').value=ar[6];
					if(ar[7] == 1){
						document.getElementById('mtUang').disabled=true;
					} else {
						document.getElementById('mtUang').disabled=false;
					}
					document.getElementById('cancelheader').setAttribute('onclick', "cancel_headher()");
					GetDefaultMataUang();
				}
            } else {
				busy_off();
				error_catch(con.status);
			}
		}	
	} 
	post_response_text(tujuan, param, respog);	
}

// CALCULATE FUNCTION 

function CalculateSubTotalPerItem(id){
	defult_tot = document.getElementById('realisasi_'+id).value;
    jmlh_brg   = document.getElementById('jmlhDiminta_'+id).value;
    harga	   = document.getElementById('harga_satuan_'+id).value;

	if((parseFloat(jmlh_brg))>=(parseFloat(defult_tot)+1)){
		alert('Quantity must equal or lower then total requested');
		document.getElementById('jmlhDiminta_'+id).value='';
		return;		
	}
	
	SubTotalPerItem = jmlh_brg * harga;
	document.getElementById('total_'+id).value = SubTotalPerItem;
	
	CalculateSubTotal();
}

function CalculateSubTotal(){
	var tbl = document.getElementById("detailBody");
	var row = tbl.rows.length;

	row=row-11;
	strUrl2 = '';
	total = 0;
	
	for(i=0;i<row;i++){
		b=document.getElementById('total_'+i).value;
		total+=parseFloat(b);
	}
	document.getElementById('total_harga_po').value = total;
}

function calculate_angDiskon(){
	nilDis = document.getElementById('angDiskon').value;
	
	if(nilDis.value!=0){
		document.getElementById('diskon').disabled=true;
		subTot = document.getElementById('total_harga_po').value;
		if(nilDis!=subTot){
			persenDis=parseFloat(nilDis/subTot)*100;
		}
		
		if(persenDis<100){
			persen=Math.ceil(persenDis);
			document.getElementById('diskon').value=persen;
		} else {
			alert("Discount value is wrong");
			document.getElementById('angDiskon').value='';
			document.getElementById('diskon').value='';
			document.getElementById('diskon').disabled=false;
		}
        CalcultagrandTotal();
	} else if(nilDis.value==0) {
		document.getElementById('diskon').disabled=false;
	}	
}

function calculate_diskon()
{
	sb_tot=document.getElementById('total_harga_po').value;
	nil_dis=document.getElementById('diskon').value;
	angk=document.getElementById('angDiskon').value;
	if((nil_dis==0)||(angk==0)){
		document.getElementById('angDiskon').disabled=false;
		document.getElementById('diskon').disabled=false;
	}
	
	if((nil_dis!=0)||(angk!=0)){
		document.getElementById('angDiskon').disabled=true;
		if(nil_dis>100) {	
			alert('Discount must lower than 100%');
			document.getElementById('diskon').value='';
			document.getElementById('angDiskon').disabled=false;
		} else { disc=(nil_dis*sb_tot)/100; }
		nilaiDis=document.getElementById('angDiskon');
		nilaiDis.value=disc;
    }
	CalcultagrandTotal();
}

function CalcultagrandTotal(){
	sb_tot = parseFloat(document.getElementById('total_harga_po').value);
	angDiskon = parseFloat(document.getElementById('angDiskon').value);
	
	// Calculate PPN
	ppn = document.getElementById('ppn').options[document.getElementById('ppn').selectedIndex].value;
	ppn = (parseFloat((sb_tot-angDiskon))*ppn)/100;
	
	// Calculate PBBKB
	pbbkb = document.getElementById('pbbkb').options[document.getElementById('pbbkb').selectedIndex].value;
	pbbkb=(parseFloat((sb_tot-angDiskon))*pbbkb)/100;
	
	// Calculate PPH
	pph = document.getElementById('pph').options[document.getElementById('pph').selectedIndex].value;
	pph = (parseFloat((sb_tot-angDiskon))*pph)/100;
	
	total_ok = parseFloat(document.getElementById('total_ok').value);

	grnd_tot = parseFloat((sb_tot - angDiskon)) + parseFloat(ppn) + parseFloat(pbbkb) + parseFloat(pph) + parseFloat(total_ok);
	total=document.getElementById('grand_total');
    total.value=grnd_tot;
	terbilang(grnd_tot);
	
}

function CaclculateTotalOngkosKirim(){
	// DPP OK
	dpp_ok = document.getElementById('dpp_ok').value;
	
	// PPN OK
	ppn_ok = document.getElementById('ppn_ok').options[document.getElementById('ppn_ok').selectedIndex].value;
	ppn_ok =(parseFloat((dpp_ok))*ppn_ok)/100;
	
	// PPH OK
	pph_ok = document.getElementById('pph_ok').options[document.getElementById('pph_ok').selectedIndex].value;
	pph_ok =(parseFloat((dpp_ok))*pph_ok)/100;
	
	TotalOk = (parseFloat(dpp_ok) + parseFloat(ppn_ok) - parseFloat(pph_ok));
	document.getElementById('total_ok').value=TotalOk;
	
	CalcultagrandTotal();
}

function terbilang(s) {
	var thousand = Array("","Ribu","Juta","Milyar","Trilyun");
    s = Math.round(s*Math.pow(10,2))/Math.pow(10,2);
    s = String(s);s = s.split(".");
    var word=s[0];
    var cent=s[1]?s[1]:"0";
    if(cent.length<2) cent+="0";

    var subword="";i=0;
    while(word.length>3) {
      subdigit=threedigit(word.substr(word.length-3, 3));
      subword=subdigit+(subdigit!=""?" "+thousand[i]+" ":"")+subword;
      word=word.substring(0, word.length-3);
      i++;
    }
    subword=threedigit(word)+" "+thousand[i]+" "+subword;
    subword=subword.replace(/^ +$/gi,"");
	
	NamaMataUang = document.getElementById('namamatauang').value;
	simbolmatauang = document.getElementById('simbolmatauang').value;
	
    word=(subword==""?"NOL ":subword)+NamaMataUang;
    subword=threedigit(cent);
    cent=(subword==""?"":"")+subword+(subword==""?"":" SEN");
	
	document.getElementById("total_biaya").value=simbolmatauang+' '+s+' ('+word+cent+')';
    //return word+cent;
}

function threedigit(word) {
    eja=Array("Nol","Satu","Dua","Tiga","Empat","Lima","Enam","Tujuh","Delapan","Sembilan");
    while(word.length<3) word="0"+word;
    word=word.split("");
    a=word[0];b=word[1];c=word[2];
    word="";
    word+=(a!="0"?(a!="1"?eja[parseInt(a)]:"Se"):"")+(a!="0"?(a!="1"?" Ratus":"ratus"):"");
    word+=" "+(b!="0"?(b!="1"?eja[parseInt(b)]:"Se"):"")+(b!="0"?(b!="1"?" Puluh":"puluh"):"");
    word+=" "+(c!="0"?eja[parseInt(c)]:"");
    word=word.replace(/Sepuluh ([^ ]+)/gi, "$1 Belas");
    word=word.replace(/Satu Belas/gi, "Sebelas");
    word=word.replace(/^[ ]+$/gi, "");

    return word;
  }


function displayList() {
    document.getElementById('dataAtas').style.display='block';
    document.getElementById('list_po').style.display='block';
    document.getElementById('list_pp').style.display='none';
    document.getElementById('form_po').style.display='none';
    load_new_data();
    clear_all_data();
}

function load_new_data(){
	param='proses=update_data';
	tujuan='log_slave_save_po.php';
	function respog(){
		if(con.readyState==4){
			if (con.status == 200){
				busy_off();
				if (!isSaveResponse(con.responseText)){
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {														   
					document.getElementById('contain').innerHTML=con.responseText;
					loadNotifikasi();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	} 
	post_response_text(tujuan, param, respog);	
}

function save_headher(){
	var tbl = document.getElementById("ppDetailTable");
	var row = tbl.rows.length;
	row=row-6;
	strUrl2 = '';
	for(i=0;i<row;i++){
		try{
			if(strUrl2 != ''){					
				strUrl2 +='&nopp[]='+trim(document.getElementById('rnopp_'+i).value)
				+'&kdbrg[]='+encodeURIComponent(trim(document.getElementById('rkdbrg_'+i).value))
				+'&spekBrg[]='+encodeURIComponent(trim(document.getElementById('spek_brg_'+i).value))
				+'&rjmlh_psn[]='+encodeURIComponent(trim(document.getElementById('jmlhDiminta_'+i).value))
				+'&rhrg_sat[]='+document.getElementById('harga_satuan_'+i).value
				+'&rsatuan_unit[]='+encodeURIComponent(trim(document.getElementById('sat_'+i).value));
			} else {
				strUrl2 +='&nopp[]='+trim(document.getElementById('rnopp_'+i).value)
				+'&kdbrg[]='+encodeURIComponent(trim(document.getElementById('rkdbrg_'+i).value))
				+'&spekBrg[]='+encodeURIComponent(trim(document.getElementById('spek_brg_'+i).value))
				+'&rjmlh_psn[]='+encodeURIComponent(trim(document.getElementById('jmlhDiminta_'+i).value))
				+'&rhrg_sat[]='+document.getElementById('harga_satuan_'+i).value
				+'&rsatuan_unit[]='+encodeURIComponent(trim(document.getElementById('sat_'+i).value));
			}
		}
		catch(e){}
	}
	
	// HEADER
	rproses		= document.getElementById('proses').value;
	nopotemp 	= document.getElementById('no_po').value;
	if(nopotemp == 'AUTO GENERATE'){
		nopo 	= document.getElementById('no_po2').value;
	} else {
		nopo 	= document.getElementById('no_po').value;
	}
	tgl_po	 	= document.getElementById('tgl_po').value;
	supplier_id = document.getElementById('supplier_id').options[document.getElementById('supplier_id').selectedIndex].value;
	npwp	 	= document.getElementById('npwp_sup').value;
	mataUang 	= document.getElementById('mtUang').options[document.getElementById('mtUang').selectedIndex].value;
	krs		 	= trim(document.getElementById('Kurs').value);
	awalan_po	= trim(document.getElementById('awalan_po').value);	
	// Pemberi PO
	ttd			= document.getElementById('persetujuan_id').options[document.getElementById('persetujuan_id').selectedIndex].value;
	
	// MIDDLE
	sub_tot		= document.getElementById('total_harga_po').value;
	disc		= document.getElementById('diskon').value;
	nil_diskon=document.getElementById('angDiskon').value;
	ppn		= document.getElementById('ppn').options[document.getElementById('ppn').selectedIndex].value;
	pbbkb 		= document.getElementById('pbbkb').options[document.getElementById('pbbkb').selectedIndex].value;
	pph 		= document.getElementById('pph').options[document.getElementById('pph').selectedIndex].value;
	ppnnilai = (parseFloat((sub_tot-nil_diskon))*ppn)/100;
	ppnnilaifixed = ppnnilai.toFixed(2);
	
	// ONGKOS KIRIM
	dpp_ok 		= document.getElementById('dpp_ok').value;
	ppn_ok 		= document.getElementById('ppn_ok').options[document.getElementById('ppn_ok').selectedIndex].value;
	pph_ok 		= document.getElementById('pph_ok').options[document.getElementById('pph_ok').selectedIndex].value;
	total_ok 	= document.getElementById('total_ok').value;
	
	grnd_tot	= document.getElementById('grand_total').value;
	pib 		= document.getElementById('pib').value;
	jenis_perlakuan 	= document.getElementById('jenis_perlakuan').options[document.getElementById('jenis_perlakuan').selectedIndex].value;
	//perlakuan_ongkos_kirim 	= document.getElementById('perlakuan_ongkos_kirim').options[document.getElementById('perlakuan_ongkos_kirim').selectedIndex].value;
	perlakuan_ongkos_kirim 	= document.getElementById('perlakuan_ongkos_kirim').value;

	// FOOTER //
	waktu_penyerahan = document.getElementById('waktu_penyerahan').value;
	delivery_loc	 = document.getElementById('tmpt_krm').options[document.getElementById('tmpt_krm').selectedIndex].value;
	cara_pem		 = document.getElementById('term_pay').value;
	garansi		 	 = document.getElementById('garansi').value;
	ketUrai			 = document.getElementById('ketUraian').value;
	
	purchs=document.getElementById('user_id').value;
	lokasi_peng=document.getElementById('tmpt_krm').value;
	
	if(supplier_id == '' || supplier_id == 0){
		alert('Nama Supplier is Mandatory');
		return;
	}
	if(ttd == '' || ttd == 0000000000){
		alert('Pemberi PO is Mandatory');
		return;
	}
	
	param='nopo='+nopo+'&tglpo='+tgl_po+'&supplier_id='+supplier_id+'&subtot='+sub_tot+'&grand_total='+grnd_tot+'&purchser_id='+purchs+'&lokasi_krm='+lokasi_peng;
	param+='&diskon='+disc+'&ppn='+ppn+'&waktu_penyerahan='+waktu_penyerahan+'&lok_kirim='+delivery_loc+'&cara_pembayarn='+cara_pem+'&nildiskon='+nil_diskon;
	param+='&proses='+rproses+'&npwp='+npwp+'&ketUraian='+ketUrai+'&awalan_po='+awalan_po+'&ppnnilai='+ppnnilaifixed;
	param+='&mtUang='+mataUang+'&Kurs='+krs+'&ttd='+ttd+'&pbbkb='+pbbkb+'&dpp_ok='+dpp_ok;
	param+='&ppn_ok='+ppn_ok+'&pph_ok='+pph_ok+'&pib='+pib+'&jenis_perlakuan='+jenis_perlakuan;
	param+='&garansi='+garansi+'&pph='+pph+'&total_ok='+total_ok+'&perlakuan_ongkos_kirim='+perlakuan_ongkos_kirim;
	param+=strUrl2;

	tujuan='log_slave_save_po.php';
	function respog(){
		if(con.readyState==4){
			if (con.status == 200){
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {														   
					document.getElementById('dataAtas').style.display='block';
					displayList();
					location.reload(true);
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	} 
	
	if(confirm("Saving on :"+mataUang+' currency, are you sure?')){
		post_response_text(tujuan, param, respog);	
	}
}










// JavaScript Document
function clear_all_data()
{
        status_inputan=0;
        document.getElementById('no_po').value='';
        document.getElementById('supplier_id').value='0';
        //document.getElementById('tgl_krm').value='';
        //document.getElementById('tmpt_krm').value='';
        //document.getElementById('bank_acc').value='';
        document.getElementById('npwp_sup').value='';
        document.getElementById('txtsearch').value='';
        document.getElementById('tgl_cari').value='';
        document.getElementById('proses').value='insert';
        //document.getElementById('tgl_krm').value='';
        document.getElementById('term_pay').value='';
        document.getElementById('ketUraian').value='';
        //document.getElementById('mtUang').value='0';
        document.getElementById('persetujuan_id').value='0000000000';
}
function show_list_pp()
{
        clear_all_data();

        document.getElementById('container_pp').innerHTML='';
        document.getElementById('list_po').style.display='none';
    document.getElementById('list_pp').style.display='block';
        document.getElementById('form_po').style.display='none';
        document.getElementById('kode_pt').value='';

                var tbl = document.getElementById("list_pp_table");
        var row = tbl.rows.length;
        row=row-2;
        for(i=1;i<=row;i++)
        {
         document.getElementById('plh_pp_'+i).checked=false;
        }

}


function cek_pp_pt(kdpt)
{
        //clear_all_data();

   if(kdpt=='')
   {

    kode_pt=document.getElementById('kode_pt').options[document.getElementById('kode_pt').selectedIndex].value;
   }
   else
   {
           show_list_pp();
           kode_pt=kdpt;
           document.getElementById('kode_pt').disabled=true;
           document.getElementById('kode_pt').value=kdpt;
   }
    user_id=trim(document.getElementById('user_id').value);
    param='kodept='+kode_pt+'&id_user='+user_id;
    param+="&proses=listPp";
  // alert(param);
//    return;
     tujuan='log_slave_po_detail.php';

    function respog()
    {
      if(con.readyState==4)
      {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                       //alert(con.responseText);
                        //show_form_po();
                        document.getElementById('container_pp').innerHTML=con.responseText;
                }
            }
            else {
                    busy_off();
                    error_catch(con.status);
            }
      }
     }
     post_response_text(tujuan, param, respog);
}
function display_number(id)
{
        if(id!='')
        {sat=document.getElementById('harga_satuan_'+id);
                change_number(sat);
                grnd_total();       
        }
        else
        {
                nilDis=document.getElementById('angDiskon');
                change_number(nilDis);
        }
}
function normal_number(id)
{
                satu=document.getElementById('harga_satuan_'+id);
                satu.value=remove_comma_var(satu.value);
}

function calculate(id){        
    defult_tot = document.getElementById('realisasi_'+id).value;
    jmlh_brg   = document.getElementById('jmlhDiminta_'+id).value;
    harga	   = document.getElementById('harga_satuan_'+id).value;

	if((parseFloat(jmlh_brg))>=(parseFloat(defult_tot)+1)){
		alert('Quantity must equal or lower then total requested');
		document.getElementById('jmlhDiminta_'+id).value='';
		return;		
	}
    else {
			if(jmlh_brg==''||harga==''){
				a=document.getElementById('total_'+id);
				a.value='';
				a=parseFloat(a.value);
			} else {
					harg=document.getElementById('harga_satuan_'+id);
					harg.value=remove_comma_var(harg.value);
					jmlh_sub=jmlh_brg*harg.value;

					if(jmlh_sub==0) {
						document.getElementById('total_'+id).value=0;
					}
					else{
						as=document.getElementById('total_'+id);
						as.value=jmlh_sub
						change_number(as);
					}

				}
        }
		grnd_total();
		//grandTotal();

}

function grnd_total(){
    var tbl = document.getElementById("detailBody");
    var row = tbl.rows.length;
    row=row-6;
    //a=document.getElementById('total_'+row);
   //alert(row);
   total=0;
   for(i=0;i<row;i++){
            b=document.getElementById('total_'+i);
            b.value=remove_comma_var(b.value);
            total+=parseFloat(b.value);
            change_number(b);
           // alert(b+"------"+total);
            //alert(b.value);
            //change_number(b);
            if(isNaN(total))
               {
                   total=0;
               }
       }
   document.getElementById('total_harga_po').value=total;
   tot=document.getElementById('total_harga_po');
   tot.value=total;
   change_number(tot);
}

function plusAll(id)
{
        isiData = document.getElementById("detailBody");
        barisIsi = isiData.rows.length;
        barisIsi=barisIsi-5;
        total=0;
        for(i=0;i<barisIsi;i++)
        {
                b=document.getElementById('total_'+i);
                b.value=remove_comma_var(b.value);
                total+=parseFloat(b.value);
                change_number(b);
                // alert(b+"------"+total);
                //alert(b.value);
                //change_number(b);
                if(isNaN(total))
                   {
                           total=0;
                   }
        }
        document.getElementById('total_harga_po').value=total;
        tot=document.getElementById('total_harga_po');
        tot.value=total;
        change_number(tot);


        //hitung diskon
        //nilPpn=document.getElementById('ppn').value;
        nil_dis=document.getElementById('diskon').value;
        angk=document.getElementById('angDiskon').value;
        if(nil_dis!="")
        {
        disc=(nil_dis*total)/100;
                nilaiDis=document.getElementById('angDiskon');
                nilaiDis.value=disc;
                change_number(nilaiDis);
                document.getElementById('nilai_diskon').value=disc;		
        }
        else
        {
                document.getElementById('diskon').value=0;
                disc=(nil_dis*total)/100;
                nilaiDis=document.getElementById('angDiskon');
                nilaiDis.value=disc;
                change_number(nilaiDis);
                document.getElementById('nilai_diskon').value=disc;	
                /*document.getElementById('ppN').value=0;
                document.getElementById('ppn').value=0;
                nilPpn=0;*/
        }

        //ppn
        nPPn=document.getElementById('ppN').value;
        if(nPPn!="")
        {
                //nilP=document.getElementById('ppN').value;
                //dis=document.getElementById('nilai_diskon');
                //subTot=document.getElementById('total_harga_po');
                //dis.value=remove_comma(dis);
                //subTot.value=remove_comma(subTot);
                nilPpn=(parseFloat((total-disc))*nPPn)/100;	
                document.getElementById('hslPPn').innerHTML=nilPpn;
                document.getElementById('ppn').value=nilPpn;
        }
        else
        {
                document.getElementById('ppN').value=0;
                document.getElementById('ppn').value=0;
                nilPpn=0;
        }
        //alert(total+"__"+disc+"___"+nilPpn);
        grnd_tot=parseFloat((total-disc))+parseFloat(nilPpn);
		test=document.getElementById('grand_total');
        test.value=grnd_tot;
        change_number(sb_tot);
        change_number(nilPpn);
        change_number(total);

}
function getZero()
{
        dis=document.getElementById('diskon');
        if(dis.value=="")
        {
                dis.value=0;
        }
        nPpn=document.getElementById('ppN');
        if(nPpn.value=="")
        {
                nPpn.value=0;
        }
        angdis=document.getElementById('angDiskon');
        //angdis.value=remove_comma(angdis);
        if(angdis.value=="")
        {
                angdis.value=0;
        }
		
        ongKirim=document.getElementById('ongKirim');
        if(ongKirim.value=="")
        {
                ongKirim.value=0;
        }		
}
function periksa_isi(obj)
{
        if(trim(obj.value)=='')	
        {
                alert('Please complete the form');
                obj.focus();
                return;
        }
}
function cek_isi(obj)
{
        if(trim(obj.value)!='')	
        {
                change_number(obj.value);
        }
        else
        {
                change_number(obj.value);
        }
}


nilPpn=0;


function calculateOngkir(){
			calculatePpn();
			grandTotal();
}

function process()
{
    clear_all_data();
    var tbl = document.getElementById("container_pp");
    var row = tbl.rows.length;
    row=row-1;
        //alert(row);
        strUrl = '';
    for(i=1;i<=row;i++)
        {
                  ar=document.getElementById('plh_pp_'+i);
           if(ar.checked==true)
                   {       
                                try{
                                        if(strUrl != '')
                                        {
                                                strUrl += '&nopp[]='+trim(document.getElementById('nopp_x'+i).innerHTML)
                                                       +'&kdbrg[]='+trim(document.getElementById('kdbrg_'+i).innerHTML)
													   +'&prioritypr[]='+trim(document.getElementById('pr_priority_id_'+i).value);
                                        }
                                        else
                                        {
                                                strUrl += '&nopp[]='+trim(document.getElementById('nopp_x'+i).innerHTML)
                                                       +'&kdbrg[]='+trim(document.getElementById('kdbrg_'+i).innerHTML)
													   +'&prioritypr[]='+trim(document.getElementById('pr_priority_id_'+i).value);
                                        }
                                }
                                catch(e){}

                        }
        }

                //return;
                if(strUrl=='')
                {
                        alert('Choose one');
                        return;
                }
                else
                {
                    kodePt=document.getElementById('kode_pt').options[document.getElementById('kode_pt').selectedIndex].value;
                    param="proses=createTable"+"&baris="+row+'&kode_pt='+kodePt;
                    param+=strUrl;
                    //alert(param);
                    tujuan='log_slave_po_detail.php';
                    function respog()
                    {
                  if(con.readyState==4)
                  {
                    if (con.status == 200) {
                            busy_off();
                            if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                            }
                            else {

                                  // document.getElementById('detail_content').innerHTML=con.responseText;
                                   //generate_nopo();
                                   document.getElementById('dataAtas').style.display='none';
                                    show_form_po();
                 var a=con.responseText.split("###");
                                                // window.alert(a[0] + " " + a[1]);

                 document.getElementById('no_po').value='AUTO GENERATE';
                 document.getElementById('no_po2').value=a[0];
                 
                  document.getElementById('ppDetailTable').innerHTML=a[1];
				  if(a[2] == 1){
					  document.getElementById('mtUang').disabled=true;
				  }
					
					
				  document.getElementById('cancelheader').setAttribute('onclick', "batal_headher('"+a[0]+"')");
                 // loadNotifikasi2();
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
                                          }	
                         } 
                         post_response_text(tujuan, param, respog);
                }
                //alert(strUrl);
}



function show_form_po()
{
    document.getElementById('list_po').style.display='none';
    document.getElementById('list_pp').style.display='none';
    document.getElementById('form_po').style.display='block';
}



function get_supplier()
{
        id_sup=document.getElementById('supplier_id').options[document.getElementById('supplier_id').selectedIndex].value;
        param='supplier_id='+id_sup;
        param+='&proses=cek_supplier';
        tujuan='log_slave_save_po.php';
        function respog()
                        {
                                  if(con.readyState==4)
                                  {
                                        if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                }
                                                else {														   
                                                                document.getElementById('npwp_sup').value=con.responseText;
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                                  }	
                         } 
                         post_response_text(tujuan, param, respog);

}



function loadNotifikasi()
{
        proses="getNotifikasi";
        param="proses="+proses;
        tujuan="log_slave_save_po.php";
     post_response_text(tujuan, param, respog);
        function respog()
        {
                if(con.readyState==4)
                {
                        if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                        //displayList();
                                                        document.getElementById('notifikasiKerja').innerHTML=con.responseText;
                                        }
                        }
                        else {
                                        busy_off();
                                        error_catch(con.status);
                        }
                }
        }

}


function cancel_headher(){
    location.reload(true);
}
function delPoDetail(nopo,stat,StatIns){
        if(stat==1)
        {
                alert('Waiting Approval');
                return;
        }
        else
        {
                if(StatIns==0)
                {
                        if(confirm("Deleting, Are you sure?"))
                        { 
                          // alert("berhasil");
                                displayList();
                        }
                        else
                        {
                           return;
                        }		
                }
                else
                {
                                document.getElementById('proses').value='';
                                ar=document.getElementById('proses');
                                ar.value='delete_all';
                                /*alert(document.getElementById('proses').value);
                                return;*/
                                ar=ar.value;
                                param='nopo='+nopo+'&proses='+ar;
                                /*alert(param);
                                return;*/
                                tujuan='log_slave_save_po.php';

                                function respog()
                                                {
                                                          if(con.readyState==4)
                                                          {
                                                                if (con.status == 200) {
                                                                        busy_off();
                                                                        if (!isSaveResponse(con.responseText)) {
                                                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                                        }
                                                                        else {														   
                                                                                //document.getElementById('contain').innerHTML=con.responseText;
                                                                                displayList();
                                                                        }
                                                                }
                                                                else {
                                                                        busy_off();
                                                                        error_catch(con.status);
                                                                }
                                                          }	
                                                 }
                                if(confirm("Deleting, are you sure"))
                                 { 
                                        post_response_text(tujuan, param, respog);	
                                 }
                                 else
                                 {
                                         return;
                                 }
                }
        }
}

function alasan_batal(nopo,stat)
{
    param='nopo='+nopo+'&stat='+stat+'&proses=get_alasan_batal';
//    alert(param);
    
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                    busy_off();
                if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    width='500';
                    height='150';
                    content="<div id=form_batal></div>";
                    ev='event';
                    title="Form Alasan Pembatalan PO";
                    showDialog1(title,content,width,height,ev);
//                    alert(con.responseText);
                    document.getElementById('form_batal').innerHTML=con.responseText;
                    return con.responseText;
                  
//                    displayList();
                }
            }
            else {
                    busy_off();
                    error_catch(con.status);
            }
        }	
    }
    
    tujuan='log_slave_save_po.php';
    post_response_text(tujuan, param, respog);
}

function delPo(nopo,stat,batal){
    batal=document.getElementById('batal').value;
        if(stat==2){
                alert('Being on correction progress');
                return;
        }
        else{
			param='nopo='+nopo+'&batal='+batal+'&proses=delete_all';
			tujuan='log_slave_save_po.php';
			function respog(){
				  if(con.readyState==4){
						if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR TRANSACTION,\n' + con.responseText);
								}
								else {														   
										
										load_new_data();
										//document.getElementById('contain').innerHTML=con.responseText;
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
				  }	
			 }
                         
			if(confirm('Are you sure delete this PO and it`s items')){
					post_response_text(tujuan, param, respog);
					closeDialog();
			}
			else{
				return;
			}
    }
}
function agree_po()
{
        width='400';
        height='200';
        //nopp=document.getElementById('nopp_'+id).value;
        content="<div id=container></div>";
        ev='event';
        title="Persetujuan Atau Penolakan Form";
        showDialog1(title,content,width,height,ev);
        //get_data_pp();	
}
function koreksiForm(npo)
{
        width='400';
        height='160';
        //nopp=document.getElementById('nopp_'+id).value;
        content="<div id=isi></div>";
        ev='event';
        title=" Koreksi No PO  :"+npo;
        showDialog1(title,content,width,height,ev);
        //get_data_pp();	
}
function getKoreksi(npo)
{
        met=document.getElementById('proses').value;
        //rnopo=document.getElementById('no_po').value;
        rnopo=npo;
        met='getKoreksi';
        param='proses='+met+'&nopo='+rnopo;
        tujuan='log_slave_save_po.php';
        function respog()
                        {
                                          if(con.readyState==4)
                                          {
                                                        if (con.status == 200) {
                                                                busy_off();
                                                                if (!isSaveResponse(con.responseText)) {
                                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                                }
                                                                else {
                                                                        /*alert(con.responseText);
                                                                        return;*/
                                        koreksiForm(npo);
                                                                                document.getElementById('isi').innerHTML=con.responseText;
                                                                                return con.responseText;
                                                                }
                                                        }
                                                        else {
                                                                busy_off();
                                                                error_catch(con.status);
                                                        }
                                          }	
                         }
        post_response_text(tujuan, param, respog);
}
function get_data_pp(npo)
{
        /*tbl=document.getElementById('ppDetailTable');
        row=tbl.rows.length;
        row=row-6;
       //alert(row);
        for(i=0;i<row;i++)
            {
                jmlh=document.getElementById('jmlhDiminta_'+i).value;
                harg_satuan=document.getElementById('harga_satuan_'+i).value;
                disk=document.getElementById('diskon').value;
                supp_id=document.getElementById('supplier_id').value;
                tgl_krm=document.getElementById('tlg_krm').value;
                loc_kirim=document.getElementById('tmpt_krm').value;
                paym_term=document.getElementById('term_pay').value;
                realis=document.getElementById('realisasi_'+i).value;
                kd_brg=document.getElementById('rkdbrg_'+i).value;
                if((jmlh=='')||(harg_satuan=='')||(disk=='')||(supp_id=='')||(tgl_kirim='')||(paym_term==''))
                    {
                        alert('Please Complete The Form First');
                        return;
                    }
            }*/

        met=document.getElementById('proses').value;
        //rnopo=document.getElementById('no_po').value;
        rnopo=npo;
        met='get_form_approval';
        param='proses='+met+'&nopo='+rnopo;
        tujuan='log_slave_save_po.php';
        function respog()
                        {
                                          if(con.readyState==4)
                                          {
                                                        if (con.status == 200) {
                                                                busy_off();
                                                                if (!isSaveResponse(con.responseText)) {
                                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                                }
                                                                else {
                                                                        /*alert(con.responseText);
                                                                        return;*/
                                        agree_po();
                                                                                document.getElementById('container').innerHTML=con.responseText;
                                                                                return con.responseText;
                                                                }
                                                        }
                                                        else {
                                                                busy_off();
                                                                error_catch(con.status);
                                                        }
                                          }	
                         }
        post_response_text(tujuan, param, respog);


}
function forward_po()
{
        nik=document.getElementById('persetujuan_id').value;
        snopo=document.getElementById('rnopp').value;
        met=document.getElementById('proses');
        met=met.value='insert_forward_po';
        param='id_user='+nik+'&proses='+met+'&nopo='+snopo;
        tujuan='log_slave_save_po.php';
        //alert(param);
        //return;
        function respog()
                {
                                  if(con.readyState==4)
                                  {
                                                if (con.status == 200) {
                                                        busy_off();
                                                        if (!isSaveResponse(con.responseText)) {
                                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                        }
                                                        else {
                                                                //alert(con.responseText);
                                                                closeDialog();
                                                                displayList();

                                                        }
                                                }
                                                else {
                                                        busy_off();
                                                        error_catch(con.status);
                                                }
                                  }	
                 } 	
                 post_response_text(tujuan, param, respog);	
}
function close_po_a()
{
        document.getElementById('close_po').style.display='block';
        document.getElementById('test').style.display='none';

}
function proses_release_po()
{
        //document.getElementById('snopo').value=nopo;
        rnopo=document.getElementById('snopo').value;
        param='nopo='+rnopo+'&proses=proses_release_po';
        tujuan='log_slave_save_po.php';
        function respog()
                {
                                  if(con.readyState==4)
                                  {
                                                if (con.status == 200) {
                                                        busy_off();
                                                        if (!isSaveResponse(con.responseText)) {
                                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                        }
                                                        else {
                                                                //document.getElementById('close_container').innerHTML=con.responseText;	
                                                                displayList();							
                                                        }
                                                }
                                                else {
                                                        busy_off();
                                                        error_catch(con.status);
                                                }
                                  }	
                 } 	
                 post_response_text(tujuan, param, respog);	


}
function cancel_po()
{
        closeDialog();
        displayList();
}
function clearRow(id)
{
        /*document.getElementById('harga_satuan_'+id).value=0;
        document.getElementById('total_'+id).value=0;	
        document.getElementById('rnopp_'+id).value='';
        document.getElementById('rkdbrg_'+id).value='';
        document.getElementById('jmlhDiminta_'+id).value='';*/
        //alert(id);
        tabel=document.getElementById("detailBody");
        tabel.removeChild(tabel.rows[id]);

}
/* Function deleteDelete(id)
 * Fungsi untuk menghapus data Detail
 * I : id row (urutan row pada table Detail)
 * P : Menghapus data pada tabel Detail
 * O : Menghapus baris pada tabel Detail
 */
 pengurang=5;
function deleteDetail(id) {
        var tbl = document.getElementById("detailBody");
                var baris = tbl.rows.length;
                baris=baris-5;
        //	alert(baris);
                //return;
                if(baris==1)
                {
                        nopo=document.getElementById('no_po').value;
                stat=0;
                        StatIns=1;
                        delPoDetail(nopo,stat,StatIns);
                }
        else if(baris>1)
                {
                        //alert(baris);

                        //alert(tabel.rows[id]);

                        //tabel.removeChild(tabel.rows[id]);
                        //elem.parentNode.removeChild(elem);
                        var detKode = document.getElementById('no_po');
                        var rkd_brg = document.getElementById('rkdbrg_'+id);
                        var nopp = document.getElementById('rnopp_'+id);
                        var purchas= document.getElementById('user_id');

                        param = "proses=detail_delete";
                        param += "&nopo="+detKode.value;
                        param += "&kd_brg="+rkd_brg.value;
                        param += "&nopp="+nopp.value;
                        param += "&purchaser="+purchas.value;
//alert(param);
                        function respon(){
                                if (con.readyState == 4) {
                                        if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR TRANSACTION,\n' + con.responseText);
                                                } else {
                                                        // Success Response
                                        //alert(id);
                                        //baris=row;
                                        //tabel=document.getElementById("detailBody");
                                        //tabel.removeChild(tabel.rows[id]);

                                        row = document.getElementById("detail_tr_"+id);
                                        if(row) 
                                        {
                                                //
                                                document.getElementById('harga_satuan_'+id).value=0;
                                                document.getElementById('total_'+id).value=0;	
                                                document.getElementById('dtNopp_'+id).innerHTML="";
                                                document.getElementById('dtKdbrg_'+id).innerHTML="";
                                                document.getElementById('jmlhDiminta_'+id).value="";
                                                row.style.display="none";
                                                //pengurang+=1;
                                                //plusAll();
                                        } 
                                        else 
                                        {
                                                alert("Row undetected");
                                        }

                                        }
                                        } else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                                }
                        }

                                if(confirm('Deleting, are you sure?'))
                                {
                                        post_response_text('log_slave_po_lokal_detail.php', param, respon);	
                                }
                                else
                                {
                                        return;
                                }
                }
}
function cariNopo()
{
        txtSearch=trim(document.getElementById('txtsearch').value);
        tglCari=trim(document.getElementById('tgl_cari').value);
        met=document.getElementById('proses');
        met=met.value='cari_nopo';
        met=trim(met);

        param='txtSearch='+txtSearch+'&tglCari='+tglCari+'&proses='+met;
        tujuan='log_slave_save_po.php';
        function respog()
                {
                                  if(con.readyState==4)
                                  {
                                                if (con.status == 200) {
                                                        busy_off();
                                                        if (!isSaveResponse(con.responseText)) {
                                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                        }
                                                        else {
                                                                //alert(con.responseText);
                                                                document.getElementById('contain').innerHTML=con.responseText;							
                                                        }
                                                }
                                                else {
                                                        busy_off();
                                                        error_catch(con.status);
                                                }
                                  }	
                 }
                 post_response_text(tujuan, param, respog);

}
function cek_pembuat(nopo)
{
        rnop=nopo;
        //alert(rnop);
        param='nopo='+rnop+'&proses=cek_pembuat_po';
        tujuan='log_slave_save_po.php';
        function respog()
                                {
                                                  if(con.readyState==4)
                                                  {
                                                                if (con.status == 200) {
                                                                        busy_off();
                                                                        if (!isSaveResponse(con.responseText)) {
                                                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                                                        }
                                                                        else {

                                                                        }
                                                                }
                                                                else {
                                                                        busy_off();
                                                                        error_catch(con.status);
                                                                }
                                                  }	
                                 }
                                post_response_text(tujuan, param, respog);
}
function cariBast(num)
{
                param='proses=update_data';
                param+='&page='+num;
                tujuan = 'log_slave_save_po.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
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
function getKurs()
{
        mtung=document.getElementById('mtUang').options[document.getElementById('mtUang').selectedIndex].value;
        tgl=document.getElementById('tgl_po').value;
        param='mtUang='+mtung+'&proses=getKurs'+'&tglpo='+tgl;
        tujuan='log_slave_save_po.php';
        post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
												MUAr = con.responseText.split("||");
                                                document.getElementById('Kurs').value=MUAr[0];
                                                document.getElementById('simbolmatauang').value=MUAr[2];
                                                document.getElementById('namamatauang').value=MUAr[1];
												
												
												if(document.getElementById('mtUang').value=='IDR'){
														document.getElementById('Kurs').disabled=true;
												} 
												else {
														document.getElementById('Kurs').disabled=false;
												}
												GetDefaultMataUang();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}

function GetDefaultMataUang(){
	mtung = document.getElementById('mtUang').options[document.getElementById('mtUang').selectedIndex].value;
	param='mtUang='+mtung+'&proses=GetDefaultMataUang';
	tujuan='log_slave_save_po.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					if(con.responseText==1){
						document.getElementById('pib').disabled=true;
						document.getElementById('ppn').disabled=false;
						//document.getElementById('pbbkb').disabled=false;
						document.getElementById('pph').disabled=false;
					} 
					else if(con.responseText==0) {
						document.getElementById('pib').disabled=false;
						document.getElementById('ppn').disabled=true;
						//document.getElementById('pbbkb').disabled=true;
						document.getElementById('pph').disabled=true;
					}
				}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
		}
	}
	
}

function checkIt(id)
{
        brs=document.getElementById('plh_pp_'+id);
        if(brs.checked!=true)
        {
                brs.checked=true;
        }
        else if(brs.checked==true)
        {
                brs.checked=false;
        }

}
/*function checkStat(id)
{
        ar=document.getElementById('plh_pp_'+id);
        if(ar.checked==true)
        {asdf asdf
                ar.checked==true;
        } adfa
        else if(ar.checked!=true)
        {
                ar.checked==false;
        }
}
*/
function doneKoreksi()
{
        rnopo=document.getElementById('rnopp').value;
        param='nopo='+rnopo+'&proses=updateKoreksi';
        tujuan='log_slave_save_po.php';
        if(confirm("Correction confirmation?"))
        {
                post_response_text(tujuan, param, respog);			
        }
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                displayList();
                                                closeDialog();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	

}
function searchSupplier(title,content,ev)
{
        width='500';
        height='400';
        showDialog1(title,content,width,height,ev);
        //alert('asdasd');
}
function findSupplier()
{
    nmSupplier=document.getElementById('nmSupplier').value;
    param='proses=getSupplierNm'+'&nmSupplier='+nmSupplier;
    tujuan='log_slave_save_po.php';
    post_response_text(tujuan, param, respog);			

    function respog(){
            if (con.readyState == 4) {
                    if (con.status == 200) {
                            busy_off();
                            if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                            }
                            else {
                                  document.getElementById('containerSupplier').innerHTML=con.responseText;
                        }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }	
}
function setData(kdSupp)
{
    l=document.getElementById('supplier_id');

    for(a=0;a<l.length;a++)
        {
            if(l.options[a].value==kdSupp)
                {
                    l.options[a].selected=true;
                }
        }

       closeDialog();
           get_supplier();
}
