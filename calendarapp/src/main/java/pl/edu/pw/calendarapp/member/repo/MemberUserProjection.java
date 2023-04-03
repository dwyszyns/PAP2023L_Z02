package pl.edu.pw.calendarapp.member.repo;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public interface MemberUserProjection extends UserDetails {

    Long getMemberId();

    @Override
    default Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    default boolean isAccountNonExpired() {
        return true;
    }

    @Override
    default boolean isAccountNonLocked() {
        return true;
    }

    @Override
    default boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    default boolean isEnabled() {
        return true;
    }
}
