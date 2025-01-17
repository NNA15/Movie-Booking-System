package com.example.test.config;

import com.example.test.payment_vnpay.VNPayUtil;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;
import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VNPAYConfig {

  @Getter
  private String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  @Getter
  private String vnp_ReturnUrl = "http://localhost:8000/api/payment/vn-pay-callback";
  @Getter
  private String vnp_TmnCode = "HXNH4W38";
  @Getter
  private String secretKey = "SJD81L2ZFBM2C3GFDMJVZHP0FKUK1WI4";
  @Getter
  private String vnp_Version = "2.1.0";
  @Getter
  private String vnp_Command = "pay";
  @Getter
  private String orderType = "other";

  public Map<String, String> getVNPayConfig() {
    Map<String, String> vnpParamsMap = new HashMap<>();
    vnpParamsMap.put("vnp_Version", this.vnp_Version);
    vnpParamsMap.put("vnp_Command", this.vnp_Command);
    vnpParamsMap.put("vnp_TmnCode", this.vnp_TmnCode);
    vnpParamsMap.put("vnp_CurrCode", "VND");
//    vnpParamsMap.put("vnp_TxnRef",  VNPayUtil.getRandomNumber(8));
    vnpParamsMap.put("vnp_OrderType", this.orderType);
    vnpParamsMap.put("vnp_Locale", "vn");
    vnpParamsMap.put("vnp_ReturnUrl", this.vnp_ReturnUrl);
    Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    String vnpCreateDate = formatter.format(calendar.getTime());
    vnpParamsMap.put("vnp_CreateDate", vnpCreateDate);
    calendar.add(Calendar.MINUTE, 2);
    String vnp_ExpireDate = formatter.format(calendar.getTime());
    vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);
    return vnpParamsMap;
  }

}
