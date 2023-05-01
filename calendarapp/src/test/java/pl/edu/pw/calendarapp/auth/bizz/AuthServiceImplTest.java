package pl.edu.pw.calendarapp.auth.bizz;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pl.edu.pw.calendarapp.auth.rest.MemberRegisterView;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private MemberRepository memberRepository;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @InjectMocks
    private AuthServiceImpl authService;

    private static final String USERNAME = "test";
    private final MemberRegisterView registerMock = new MemberRegisterView();

    @BeforeEach
    void setUp() {
        registerMock.setUsername(USERNAME);
    }

    @Test
    void registerMemberExists() {
        when(memberRepository.findMemberByUsername(anyString())).thenReturn(Optional.of(new MemberUserProjectionMock()));
        assertThrows(IllegalArgumentException.class, () -> authService.registerMember(registerMock));
    }

    @Test
    void registerMemberDoesntExist() {
        when(memberRepository.findMemberByUsername(anyString())).thenReturn(Optional.empty());
        assertDoesNotThrow(() -> authService.registerMember(registerMock));
        verify(memberRepository, times(1)).save(any());
    }
}