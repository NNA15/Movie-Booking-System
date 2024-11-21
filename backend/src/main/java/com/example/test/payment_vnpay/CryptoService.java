package com.example.test.payment_vnpay;

import jakarta.annotation.PostConstruct;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;

@Service
public class CryptoService {

  private final Mac mac = Mac.getInstance("HmacSHA512");

  private String secretKey="SJD81L2ZFBM2C3GFDMJVZHP0FKUK1WI4";;

  public CryptoService() throws NoSuchAlgorithmException {
  }

  @PostConstruct
  void init() throws Exception {
    SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA512");
    mac.init(secretKeySpec);
  }


  public String sign(String data) {
    try {
      return EncodingUtil.toHexString(mac.doFinal(data.getBytes()));
    }
    catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
  }
}
