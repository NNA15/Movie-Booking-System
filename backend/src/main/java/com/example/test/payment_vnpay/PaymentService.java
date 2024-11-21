package com.example.test.payment_vnpay;

import static com.example.test.payment_vnpay.VNPayUtil.hmacSHA512;

import com.example.test.config.VNPAYConfig;
import com.example.test.dto.IPNResponse;
import com.example.test.entities.Booking;
import com.example.test.entities.Seat;
import com.example.test.repositories.BookingRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@RequiredArgsConstructor
public class PaymentService {
  private final VNPAYConfig vnPayConfig;

  @Autowired
  private BookingRepository bookingRepository;

  private final CryptoService cryptoService;


  public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request) {
    long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
    String bankCode = request.getParameter("bankCode");
    Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
    vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
    if (bankCode != null && !bankCode.isEmpty()) {
      vnpParamsMap.put("vnp_BankCode", bankCode);
    }
    vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
    String bookingCode = request.getParameter("bookingCode");
    vnpParamsMap.put("vnp_TxnRef",  bookingCode);
    vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang:" +  bookingCode);
    //build query url
    String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
    String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
    String vnpSecureHash = hmacSHA512(vnPayConfig.getSecretKey(), hashData);
    queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
    String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
    return PaymentDTO.VNPayResponse.builder()
        .code("ok")
        .message("success")
        .paymentUrl(paymentUrl).build();
  }

  public boolean verifyIpn(Map<String, String> params) {
    var reqSecureHash = params.get("vnp_SecureHash");
    params.remove("vnp_SecureHash");
    params.remove("vnp_SecureHashType");
    var hashPayload = new StringBuilder();
    var fieldNames = new ArrayList<>(params.keySet());
    Collections.sort(fieldNames);

    var itr = fieldNames.iterator();
    while (itr.hasNext()) {
      var fieldName = itr.next();
      var fieldValue = params.get(fieldName);
      if ((fieldValue != null) && (!fieldValue.isEmpty())) {
        //Build hash data
        hashPayload.append(fieldName);
        hashPayload.append("=");
        hashPayload.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

        if (itr.hasNext()) {
          hashPayload.append("&");
        }
      }
    }

    var secureHash = cryptoService.sign(hashPayload.toString());
    return secureHash.equals(reqSecureHash);
  }

  public IPNResponse handleResult(Map<String, String> params) {
    if (!verifyIpn(params)) {
      return new IPNResponse("97", "Signature failed");
    }

    IPNResponse response;
    String txnRef = params.get("vnp_TxnRef");
    Booking booking = bookingRepository.findByBookingCode(txnRef);
    if(booking != null) {
          if(params.get("vnp_ResponseCode").equals("00")) {
            booking.setPaid(true);
            bookingRepository.save(booking);
            response = new IPNResponse("00", "Confirm Success");
          }
          else {
            for(Seat seat : booking.getSeatList()) {
              seat.setAvailable(true);
            }
            bookingRepository.delete(booking);
            response = new IPNResponse("99", "Payment Failed");
          }
    }
    else {
      response = new IPNResponse("99", "Not found Booking");
    }

    System.out.println("INP response:" + response);
    return response;
  }
}
