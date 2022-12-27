package kr.tareun.ranchat.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig{

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception{

        // 인증 권한이 필요한 요청(URL)
        http.authorizeRequests()
                .antMatchers("/member").authenticated(); // 인증이 필요한 URL

        // 시큐리티 로그인 설정
        http.formLogin()
                .permitAll().and().csrf().disable(); // csrf 토큰 사용 안함(임시)
        return http.build();
    }

}