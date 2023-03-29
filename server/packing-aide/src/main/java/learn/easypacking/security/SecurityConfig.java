package learn.easypacking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {

        http.csrf().disable();
        http.cors();
        http.authorizeRequests()

                .antMatchers(HttpMethod.POST,"/api/authenticate").permitAll()
                .antMatchers("/api/refresh_token").authenticated()
                .antMatchers("/api/create_account").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/container",
                        "/api/container/*",
                        "/api/container/event/*",
                        "/api/event/*",
                        "/api/event/user/*",
                        "/api/item",
                        "/api/item/*",
                        "/api/item/user/*",
                        "/api/item/container/*",
                        "/api/location/*",
                        "/api/todo/*").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.POST,
                        "/api/container",
                        "/api/event",
                        "/api/item",
                        "/api/location",
                        "/api/todo").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.PUT,
                        "/api/container/*",
                        "/api/event/*",
                        "/api/item/*",
                        "/api/location/*",
                        "/api/todo/*").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.DELETE,
                        "/api/container/*",
                        "/api/event/*",
                        "/api/item/*",
                        "/api/location/*",
                        "/api/todo/*").hasAnyAuthority("USER")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

