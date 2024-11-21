package com.example.test.payment_vnpay;

import com.example.test.dto.IPNResponse;
import com.example.test.payment_vnpay.PaymentDTO.VNPayResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/payment")
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {
  private final PaymentService paymentService;
  @GetMapping("/vn-pay")
  public ResponseEntity<VNPayResponse> pay(HttpServletRequest request) {
    VNPayResponse vnPayResponse = paymentService.createVnPayPayment(request);
    return new ResponseEntity<>(vnPayResponse, HttpStatus.CREATED);
  }
  @GetMapping("/vn-pay-callback")
  public ResponseEntity<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
    String status = request.getParameter("vnp_ResponseCode");
    if (status.equals("00")) {
      return new ResponseEntity<>(new VNPayResponse("00", "Success", ""), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/vnpay_ipn")
  public IPNResponse processIpn(@RequestParam Map<String, String> params) {
    System.out.println("IPN RESULT");
    return paymentService.handleResult(params);
  }
}
