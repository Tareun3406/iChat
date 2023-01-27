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

        //비회원 세션관리
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);

        // 시큐리티 로그인 설정
        http.formLogin()
                .successHandler(loginHandler)
                .failureHandler(loginHandler)
                .permitAll().and().csrf().disable(); // csrf 토큰 사용 안함(임시)

        http.logout()
                .logoutSuccessUrl("http://localhost:3000/")
                .invalidateHttpSession(true).deleteCookies("JSESSIONID");
        return http.build();
    }
}