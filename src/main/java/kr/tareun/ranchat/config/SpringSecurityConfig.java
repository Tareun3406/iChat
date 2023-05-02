package kr.tareun.ranchat.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig{

    final LoginHandler loginHandler;

    @Autowired
    public SpringSecurityConfig(LoginHandler loginHandler) {
        this.loginHandler = loginHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception{

        http.authorizeRequests();
        http.cors();

        // csrf 체크 제외
        http.csrf().ignoringAntMatchers("/emailCertify");
        http.csrf().ignoringAntMatchers("/changePw");
        http.csrf().ignoringAntMatchers("/logout");


        //비회원 세션관리
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);

        // 시큐리티 로그인 설정
        http.formLogin()
                .successHandler(loginHandler)
                .failureHandler(loginHandler)
                .permitAll();

        http.logout()
                .invalidateHttpSession(true).deleteCookies("JSESSIONID");
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://ranchat.kr/");
        configuration.addAllowedOrigin("http://localhost:3000/");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}