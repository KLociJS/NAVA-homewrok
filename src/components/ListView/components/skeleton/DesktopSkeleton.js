import { Box, Skeleton } from "@mui/material";

function DesktopSkeleton() {
  return (
    <Box
      sx={{
        display: { mobile: "none", tablet: "none", desktop: "flex" },
        flexDirection: "column",
        gap: 4,
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          {/* Thumbnail */}
          <Skeleton variant='rounded' width={180} height={125} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Skeleton variant='rounded' width={350} height={24} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton variant='rounded' width={100} height={20} />
                <Skeleton variant='rounded' width={100} height={20} />
              </Box>
            </Box>
            {/* Metadata */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton variant='rounded' width={180} height={16} />
                <Skeleton variant='rounded' width={150} height={16} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton variant='rounded' width={180} height={16} />
                <Skeleton variant='rounded' width={150} height={16} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton variant='rounded' width={180} height={16} />
                <Skeleton variant='rounded' width={150} height={16} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton variant='rounded' width={180} height={16} />
                <Skeleton variant='rounded' width={150} height={16} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default DesktopSkeleton;
