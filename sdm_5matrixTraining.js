/**
 * @author Developer
 */

function hapus(matrixid)
{
    golongan2=document.getElementById('golongan2').options[document.getElementById('golongan2').selectedIndex].value;
    if(confirm('Delete ?')){
        met='delete';
        param='matrixid='+matrixid+'&method='+met+'&golongan2='+golongan2;
        tujuan='sdm_slave_5matrixTraining.php';
        post_response_text(tujuan, param, respog);		
    }else{
        
    }
    
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
                    document.getElementById('container').innerHTML=con.responseText;
                    cancel();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }
    
}

/*function pilihjabatan(){        
    jabatan2=document.getElementById('jabatan2').options[document.getElementById('jabatan2').selectedIndex].value;
    param='jabatan2='+jabatan2+'&method=pilih';
    tujuan='sdm_slave_5matrixTraining.php';
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
                    //alert(con.responseText);
                    document.getElementById('container').innerHTML=con.responseText;
                    cancel();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }

}*/

function pilihgolongan(){        
    golongan2=document.getElementById('golongan2').options[document.getElementById('golongan2').selectedIndex].value;
    param='golongan2='+golongan2+'&method=pilih';
    tujuan='sdm_slave_5matrixTraining.php';
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
                    //alert(con.responseText);
                    document.getElementById('container').innerHTML=con.responseText;
                    cancel();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }

}


function simpan()
{
    //jabatan=document.getElementById('jabatan').options[document.getElementById('jabatan').selectedIndex].value;
    golongan=document.getElementById('golongan').options[document.getElementById('golongan').selectedIndex].value;
    departemen=document.getElementById('departemen').options[document.getElementById('departemen').selectedIndex].value;
    kategori=document.getElementById('kategori').options[document.getElementById('kategori').selectedIndex].value;
    topik=document.getElementById('topik').value;
    remark=document.getElementById('remark').value;
    matrixid=document.getElementById('matrixid').value;
    met=document.getElementById('method').value;
    alerttdklngkap=document.getElementById('alerttdklngkap').value;
    //jabatan2=jabatan;
    if((trim(golongan)=='')||(trim(departemen)=='')||(trim(kategori)=='')||(trim(topik)=='')||(trim(remark)==''))
    {
        alert(alerttdklngkap);
    }
    else
    {
        param='golongan='+golongan+'&departemen='+departemen+'&kategori='+kategori+'&method='+met+'&topik='+topik+'&remark='+remark+'&matrixid='+matrixid;
        tujuan='sdm_slave_5matrixTraining.php';
        post_response_text(tujuan, param, respog);		
    }

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
                    document.getElementById('container').innerHTML=con.responseText;
                    cancel();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }
}

function fillField(golongan,departemen,kategori,topik,remark,matrixid)
{
    l=document.getElementById('golongan');
    
    for(a=0;a<l.length;a++)
    {
        if(l.options[a].value==golongan)
        {
            l.options[a].selected=true;
        }
    }
	
	m=document.getElementById('departemen');
    
    for(a=0;a<l.length;a++)
    {
        if(m.options[a].value==departemen)
        {
            m.options[a].selected=true;
        }
    }

    k=document.getElementById('kategori');
    
    for(a=0;a<k.length;a++)
    {
        if(k.options[a].value==kategori)
        {
            k.options[a].selected=true;
        }
    }

    document.getElementById('golongan').disabled=true;
    document.getElementById('departemen').disabled=true;
    //document.getElementById('kategori').disabled=true;
    document.getElementById('topik').value=topik;
    document.getElementById('remark').value=remark;
    document.getElementById('method').value='update';
    
    document.getElementById('matrixid').value=matrixid;    
}

function cancel()
{
    document.getElementById('golongan').disabled=false;
    document.getElementById('departemen').disabled=false;
    document.getElementById('kategori').disabled=false;
    document.getElementById('kategori').value='';
    document.getElementById('topik').value='';
    document.getElementById('remark').value='';
    document.getElementById('method').value='insert';		
    document.getElementById('matrixid').value='';
    
    golongan2=document.getElementById('golongan2').options[document.getElementById('golongan2').selectedIndex].value;
    l=document.getElementById('golongan');    
    for(a=0;a<l.length;a++)
    {
        if(l.options[a].value==golongan2)
        {
            l.options[a].selected=true;
        }
    }
    
}

//function lihat(jabatan,kriteria,ev)
//{
//   param='jabatan='+jabatan+'&kriteria='+kriteria+'&method=lihat';
//   tujuan='sdm_slave_5kriteriaPsy.php'+"?"+param;  
//   width='600';
//   height='250';
//  
//   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
//   showDialog1('Deskripsi '+kriteria,content,width,height,ev); 	
//}
//
//function lihatpdf(ev,tujuan)
//{
//    jabatan2=document.getElementById('jabatan2').options[document.getElementById('jabatan2').selectedIndex].value;
//    judul='Report PDF';	
//    param='jabatan2='+jabatan2+'&method=pdf';
//    if(trim(jabatan2)=='')
//    {
//        alert('Please choose...');
//        document.getElementById('jabatan2').focus();
//    }
//    else{
//        printFile(param,tujuan,judul,ev)	        
//    }
//}
//
//function printFile(param,tujuan,title,ev)
//{
//   tujuan=tujuan+"?"+param;  
//   width='600';
//   height='250';
//   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
//   showDialog1(title,content,width,height,ev); 	
//}