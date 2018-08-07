package com.condescendors.pollingapp.pollingapp.security.jwt;

import com.condescendors.pollingapp.pollingapp.constants.AppConstants;
import com.condescendors.pollingapp.pollingapp.security.CustomUserDetailService;
import com.condescendors.pollingapp.pollingapp.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter{

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    private final Logger logger= LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {


        try {
            String jwtToken=resolveToken(httpServletRequest);

            if (StringUtils.hasText(jwtToken) && tokenProvider.validateToken(jwtToken)){

                Long userId=tokenProvider.getUserFromJWT(jwtToken);

                UserDetails currentUser=customUserDetailService.loadUserById(userId);

                UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(currentUser,"",currentUser.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

        }catch (Exception ex){
            logger.error("Cannot resolve JWT Token ",ex.getMessage());
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }


    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AppConstants.AUTH_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7,bearerToken.length());
        }
        return null;
    }
}
