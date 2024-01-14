import { CheckCircle, PanoramaFishEye } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";

import { signIn, useSession } from "next-auth/react";

interface ISnsImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  color: string;
  showToolTip?: boolean;
}

interface IFindBtnProps {
  content?: string;
}

export default function SignInContainer() {
  // console.log(theme?.typography?.h4);

  const [showDialog, setShowDialog] = useState({ show: false, message: "" });

  const session = useSession();
  const router = useRouter();
  console.log("홈에서 찍은 세션", session.data?.user);

  const imageDatas = [
    {
      src: "/icons/kakao.svg",
      width: 48,
      height: 48,
      alt: "kakao",
      color: "#ffea00",
      showToolTip: false,
    },
    {
      src: "/icons/naver.svg",
      width: 48,
      height: 48,
      alt: "/naver",
      color: "#03C759",
      showToolTip: true,
    },
    {
      src: "/icons/google.svg",
      width: 48,
      height: 48,
      alt: "google",
      color: "#EFEFEF",
      showToolTip: false,
    },
    {
      src: "/icons/apple.svg",
      width: 48,
      height: 48,
      alt: "apple",
      color: "#222",
      showToolTip: false,
    },
  ];

  const handleSuccess = async (data: FieldValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }).catch((e) => {
        console.log("error", e);
      });

      if (result?.error) {
        setShowDialog({ show: true, message: result.error });
        return;
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  //   if (session.status === "authenticated") {
  //     router.replace("/");

  //     return;
  //   }
  const snsButtonFunction = (el: ISnsImageProps) => {
    return (
      <SnsBoxST
        key={el.src}
        onClick={() => signIn(el.alt, { callbackUrl: "/success" })}
      >
        <SnsImageST
          color={el.color}
          src={el.src}
          alt={el.alt}
          width={el.width}
          height={el.height}
        />
      </SnsBoxST>
    );
  };

  return (
    <SignInBoxSTWrapper>
      <BoxSTSecondary>
        <FormContainer>
          <FormContainerBoxST>
            <SignInTitleTypographyST variant="h4">
              아트봉봉 시작하기
            </SignInTitleTypographyST>
            <StyledTextField
              variant="filled"
              size="small"
              name="email"
              placeholder="이메일을 입력해주세요"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
              autoComplete="off"
              //   validation={{
              //     validate: (value) => {
              //       if (!value) {
              //         return "이메일을 입력해주세요.";
              //       }
              //       if (!isEmailFormat(value)) {
              //         return "이메일 형식이 올바르지 않습니다.";
              //       }
              //       return true;
              //     },
              //   }}
            />
            <StyledTextField
              variant="filled"
              size="small"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ disableUnderline: true }}
              //   validation={{
              //     validate: (value) => {
              //       if (!value) {
              //         return "비밀번호를 입력해주세요.";
              //       }

              //       if (value.length < 8) {
              //         return "비밀번호는 8자리 이상이어야 합니다.";
              //       }
              //       return true;
              //     },
              //   }}
            />

            <FormControlLabelST
              control={
                <Checkbox
                  defaultChecked
                  icon={<PanoramaFishEye />}
                  checkedIcon={<CheckCircle />}
                />
              }
              label="아이디 저장"
            />

            <LoginButtonST type="submit" color="primary" variant="outlined">
              로그인
            </LoginButtonST>
          </FormContainerBoxST>
        </FormContainer>

        <FindBoxSTWrapper>
          <FindButtonST
            onClick={() => {
              router.push("/signup");
            }}
          >
            아이디 찾기
          </FindButtonST>
          <Image
            width={2}
            height={10}
            alt="divider"
            src="/icons/signInDivider.svg"
            style={{ top: "10px", position: "relative" }}
          />
          <FindButtonST
            onClick={() => {
              router.push("/signup");
            }}
          >
            비밀번호 찾기
          </FindButtonST>
          <Image
            width={2}
            height={10}
            style={{ top: "10px", position: "relative" }}
            alt="divider"
            src="/icons/signInDivider.svg"
          />
          <FindButtonST
            onClick={() => {
              router.push("/signup");
            }}
          >
            회원가입
          </FindButtonST>
        </FindBoxSTWrapper>

        <LineBoxST />

        <SnsTypographyST variant="subtitle2">SNS 간편 로그인</SnsTypographyST>

        <SnsButtonGroupST>
          {imageDatas.map((el: ISnsImageProps) => {
            return snsButtonFunction(el);
          })}
        </SnsButtonGroupST>

        <Dialog
          open={showDialog.show}
          maxWidth={"md"}
          onClose={() => {
            setShowDialog({ show: false, message: "" });
          }}
        >
          <DialogTitle>로그인</DialogTitle>
          <DialogContent sx={{ minWidth: "300px" }}>
            <DialogContentText sx={{ textAlign: "center" }}>
              가입된 회원이 아닙니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowDialog({ show: false, message: "" });
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </BoxSTSecondary>
    </SignInBoxSTWrapper>
  );
}

const StyledTextField = styled(TextFieldElement)(({ theme }) => {
  return {
    fontFamily: theme.typography.fontFamily,
    minWidth: "320px",
    marginBottom: "16px",
    "& .MuiFilledInput-root": {
      // overflow: "hidden",
      display: "flex",
      height: "52px",
      padding: "0px 0px 15px 12px",
      justifyContent: "center",
      alignItems: "center",
      gap: "4px",
      alignSelf: "stretch",
      borderRadius: "12px",
      //   backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1.5px solid",
      borderColor:
        theme.palette.mode === "light" ? "rgba(0,0,0,0.3)" : "#2D3843",
      backgroundColor: "transparent",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },

      "&.Mui-focused": {
        backgroundColor: "transparent",
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
      "&.Mui-error": {
        borderColor: theme.palette.error.main,
        // borderWidth: "2px",
      },
    },
  };
});
const SnsBoxST = styled(Box)(({ theme }) => {
  return {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    placeSelf: "center",
    cursor: "pointer",
  };
});

const SnsImageST = styled(Image)(({ color }: ISnsImageProps) => {
  return {
    borderRadius: "100%",
    padding: "7px",
    flexShrink: 0,
    backgroundColor: color,
  };
});

const LineBoxST = styled(Box)(() => {
  return {
    width: "320px",
    height: "1px",
    backgroundColor: "#e0e0e0",
    marginBottom: "20px",
    marginTop: "32px",
  };
});

const FindBoxSTWrapper = styled(Box)(() => {
  return {
    display: "flex",
    minWidth: "320px",
    justifyContent: "center",
  };
});
const SignInBoxSTWrapper = styled(Box)(() => {
  return {
    width: "100%",
    height: "100vh",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
});

const FormContainerBoxST = styled(Box)(() => {
  return {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
});

const SignInTitleTypographyST = styled(Typography)((theme: any) => {
  return {
    fontVariant: theme?.typography?.h4,
    fontFamily: theme?.typography?.fontFamily,
    fontSize: theme?.typography?.h4?.fontSize,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "40px",
    marginBottom: "24px",
  };
});
const SnsTypographyST = styled(Typography)(() => {
  return {
    fontVariant: "subtitle2",
    fontFamily: "Noto Sans",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    marginBottom: "32px",
    textAlign: "center",
  };
});

const SnsButtonGroupST = styled(ButtonGroup)(() => {
  return {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    justifyContent: "center",
  };
});

const LoginButtonST = styled(Button)(() => {
  return {
    marginTop: "24px",
    display: "flex",
    height: "52px",
    minWidth: "90px",
    maxWidth: "320px",
    padding: "10px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    alignSelf: "stretch",
    width: "345px",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "Noto Sans",
    textAlign: "center",
    lineHeight: "22px",
    borderRadius: "32px",
    marginBottom: "12px",
    "&:hover": {
      filter: "brightness(0.9)",
      // backGroundColor: "none",
    },
  };
});

const FormControlLabelST = styled(FormControlLabel)(() => {
  return {
    display: "flex",
    height: "38px",
    // alignItems: "center",
    // maxWidth: "320px",
    gap: "8px",
    alignSelf: "stretch",
  };
});

const FindButtonST = styled(Button)(({ content }: IFindBtnProps) => {
  return {
    maxWidth: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    alignSelf: "stretch",
    color: "#9E9E9E",
    "&:hover": {
      backgroundColor: "transparent",
    },
    // "&::before": {
    //   content: `'${content}'`,
    // },
  };
});

const BoxSTSecondary = styled(Box)(() => {
  return {
    minWidth: "320px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
});
