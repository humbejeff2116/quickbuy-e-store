







const nodemailer = require('nodemailer');


module.exports = function(credentails){
    let mailTransport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:credentails.gmail.user,
            pass: credentails.gmail.password,
        }
    });

    let from = '"quick buy" <info@quickbuy.com>';
    let errorRecipient ='humbejeff2116@gmail.com';
    return{
        send: function(to,subject,body){
            mailTransport.sendMail({
                from:from,
                to:to,
                subject:subject,
                html:body,
                generateTextFromHtml:true
            },(err)=>{
                if(err){
                    console.error('unable to send mail: ' + err);
                }
            })                
        },

        emailError:function(message,filename,exception){
            let body = `<h1>quick buy site err</h1>  message:<br /><pre>${message} </pre><br />`;
            if(exception){
                body += `filename:<br /><pre> ${exception}</pre><br />`
            }
            if(filename){
                body += `filename:<br /><pre> ${filename}</pre><br />`
            }
            mailTransport.sendMail({
                from:from,
                to:to,
                subject:'quickbuy site error',
                html:body,
                generateTextFromHtml:true
            },(err)=>{
                if(err){
                    console.error('unable to send mail: ' + err);
                }
            })
        }
    } 
}